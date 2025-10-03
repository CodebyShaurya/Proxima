"use client";

import { useRouter } from 'next/navigation';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
        <SignupForm onToggleMode={() => router.push('/login')} />
    </div>
  );
}
