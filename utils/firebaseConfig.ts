// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Helper: sanitize env values by trimming whitespace and removing surrounding
// quotes or trailing commas that sometimes appear when env files are malformed.
const clean = (v?: string) => {
  if (!v) return v;
  let s = v.trim();
  // remove surrounding single or double quotes
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  // remove trailing comma
  if (s.endsWith(',')) s = s.slice(0, -1);
  return s;
};

const firebaseConfig = {
  apiKey: clean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: clean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: clean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: clean(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: clean(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

// Dev-time check: log the sanitized projectId so we can verify it's not quoted or malformed
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.info('Firebase sanitized projectId:', firebaseConfig.projectId);
}


// Initialize Firebase (guard against duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export const auth = getAuth(app);

// Optional: force long polling to avoid WebChannel streaming issues on some networks
// Set NEXT_PUBLIC_FIRESTORE_FORCE_LONG_POLLING=true in .env.local to enable.
if (process.env.NEXT_PUBLIC_FIRESTORE_FORCE_LONG_POLLING === 'true') {
  try {
    // runtime, use any to access legacy settings setter
    (db as any).settings?.({ experimentalForceLongPolling: true });
  } catch (e) {
    // ignore if settings is not available
    // eslint-disable-next-line no-console
    console.warn('Could not set experimentalForceLongPolling on Firestore', e);
  }
}

// If running emulator, connect to it when FIRESTORE_EMULATOR_HOST is set
if (process.env.FIRESTORE_EMULATOR_HOST) {
  try {
    // FIRESTORE_EMULATOR_HOST expected like 'localhost:8080'
    const [host, portStr] = process.env.FIRESTORE_EMULATOR_HOST.split(':');
    const port = parseInt(portStr || '8080', 10) || 8080;
    connectFirestoreEmulator(db, host, port);
    // eslint-disable-next-line no-console
    console.info(`Connected Firestore to emulator at ${host}:${port}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to connect Firestore emulator', e);
  }
}

export { db };
