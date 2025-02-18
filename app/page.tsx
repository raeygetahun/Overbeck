'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; 

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user?.image) {
      router.push('/admin/dashboard');
    } else {
      router.push('/volunteer/dashboard');
    }
  }, [session, router]); 

  return <></>;
}

Home.requireAuth = true;