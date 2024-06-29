'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const SuccessButton = () => {
  const router = useRouter();
  const handleGoToDashboard = () => {
    router.refresh();
    router.replace('/dashboard');
  };
  return (
    <button
      onClick={handleGoToDashboard}
      className='my-5 rounded bg-main px-3 py-2.5 text-white hover:bg-mainHover'
    >
      Go to Dashboard
    </button>
  );
};

export default SuccessButton;
