'use client';
import { UserAuth } from '@/context/AuthProvider';

export const SubscribeButton = () => {
  const { userData } = UserAuth();
  return (
    <button
      disabled={
        userData?.isAvailableFreeTrial === undefined ||
        userData?.isAvailableFreeTrial == '' ||
        userData?.isAvailableFreeTrial === false
      }
      className='mt-5 w-full bg-blue-400 py-2 text-white hover:bg-blue-500 disabled:bg-blue-200 '
    >
      Get Free Trial
    </button>
  );
};
