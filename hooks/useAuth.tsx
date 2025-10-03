"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/utils/firebaseConfig';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  experience?: string;
  expectedSalary?: string;
  preferredJobTypes?: string[];
  skills?: string[];
  credits: number;
  isBlocked?: boolean;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signup: (data: any) => Promise<User>;
  login: (email: string, password?: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserData: (patch: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate from localStorage if present
    try {
      const raw = localStorage.getItem('jm_user');
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        // Try to refresh from server to get latest data
        (async () => {
          try {
            console.info('[Auth] Hydrating from storage, will try server refresh for id=', parsed.id);
            const docRef = doc(db, 'users', parsed.id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              setUser({ id: snap.id, ...(snap.data() as any) } as User);
            } else {
              // fallback to stored
              console.info('[Auth] No server record found, using stored user');
              setUser(parsed);
            }
          } catch (err) {
            console.warn('[Auth] Server refresh failed, using stored user', err);
            setUser(parsed);
          } finally {
            setLoading(false);
          }
        })();
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem('jm_user', JSON.stringify(u));
    else localStorage.removeItem('jm_user');
  };

  const signup = async (data: any) => {
    // create a user record in 'users' collection
    const payload = {
      email: data.email,
      password: data.password, // WARNING: storing plaintext password is insecure
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone ?? null,
      location: data.location ?? null,
      experience: data.experience ?? null,
      expectedSalary: data.expectedSalary ?? null,
      preferredJobTypes: data.preferredJobTypes ?? [],
      skills: data.skills ?? [],
      credits: 10,
      isBlocked: false,
      createdAt: serverTimestamp(),
    } as any;

    try {
      const col = collection(db, 'signupSubmissions');
      const ref = await addDoc(col, payload);
      const created = { id: ref.id, ...payload } as User;
      persist(created);
      console.info('[Auth] Signup successful, user id=', ref.id);
      return created;
    } catch (err) {
      // Fallback: persist a local-only user so the app can proceed offline / when write failed
      console.error('[Auth] Signup failed to write to Firestore, creating local fallback user', err);
      const fallback: User = {
        id: `local-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone ?? null,
        location: data.location ?? null,
        experience: data.experience ?? null,
        expectedSalary: data.expectedSalary ?? null,
        preferredJobTypes: data.preferredJobTypes ?? [],
        skills: data.skills ?? [],
        credits: 10,
        isBlocked: false,
      };
      persist(fallback);
      return fallback;
    }
  };

  const login = async (email: string, password?: string) => {
    try {
      const q = query(collection(db, 'signupSubmissions'), where('email', '==', email));
      const snap = await getDocs(q);
      if (snap.empty) throw new Error('No user found');
      const docSnap = snap.docs[0];
      const record = docSnap.data() as any;

      const storedPassword = record.password;
      if (storedPassword) {
        if (storedPassword !== password) throw new Error('Invalid credentials');
      } else {
        // allow login if no password stored (legacy signup)
        console.info('[Auth] Legacy user without password signing in by email match');
      }

      const u: User = { id: docSnap.id, ...record } as any;
      persist(u);
      console.info('[Auth] Login successful, user id=', docSnap.id);
      return u;
    } catch (err) {
      console.error('[Auth] Login error', err);
      throw err;
    }
  };

  const logout = async () => {
    persist(null);
  };

  const updateUserData = async (patch: Partial<User>) => {
    if (!user) throw new Error('Not authenticated');
    const ref = doc(db, 'users', user.id);
    await updateDoc(ref, patch as any);
    const updated = { ...user, ...patch } as User;
    persist(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
