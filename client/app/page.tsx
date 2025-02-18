'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      // router.push('/admin/dashboard');

      redirect('/signin');
    },
  });
  const router = useRouter();

  if (session?.data?.user?.image) {
    router.push('/admin/dashboard');
  } else {
    router.push('/volunteer/dashboard');
  }
  return (<></>)
}

Home.requireAuth = true