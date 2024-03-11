'use client';

import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  console.log('error is', error);
  const router = useRouter();
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold'>Something Went Wrong!</h1>
      <button
        className='mt-5 rounded bg-main px-2 py-1.5 text-white'
        onClick={() => router.refresh()}
      >
        Try Again
      </button>
    </div>
  );
}
