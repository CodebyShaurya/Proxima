import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let cachedDb: ReturnType<typeof getFirestore> | null = null;

export function getAdminDb() {
  if (cachedDb) return cachedDb;

  if (!getApps().length) {
    // Prefer a single JSON env var if provided
    const saJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (saJson) {
      try {
        const serviceAccount = JSON.parse(saJson);
        if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
          throw new Error('FIREBASE_SERVICE_ACCOUNT is missing required fields');
        }
        initializeApp({ credential: cert(serviceAccount) });
      } catch (e) {
        throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT JSON: ' + (e as Error).message);
      }
    } else {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

      if (projectId && clientEmail && rawPrivateKey) {
        const privateKey = rawPrivateKey.replace(/\\n/g, '\n');
        initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
        });
      } else {
        // Fallback to ADC if available (e.g., GCP environment)
        try {
          initializeApp({ credential: applicationDefault() });
        } catch {
          throw new Error('Firebase admin credentials are not configured. Provide FIREBASE_SERVICE_ACCOUNT or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.');
        }
      }
    }
  }

  cachedDb = getFirestore();
  return cachedDb;
}