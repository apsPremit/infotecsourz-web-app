'use client';

import { useAuth } from '@/context/AuthProvider';
import { useSession } from 'next-auth/react';

export const SubscribeButton = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { userData } = useAuth();
  return (
    <button
      disabled={
        userData?.able_free_trial === undefined ||
        userData?.able_free_trial == '' ||
        userData?.able_free_trial === false
      }
      className='mt-5 w-full bg-blue-400 py-2 text-white hover:bg-blue-500 disabled:bg-blue-200 '
    >
      Get Free Trial
    </button>
  );
};
