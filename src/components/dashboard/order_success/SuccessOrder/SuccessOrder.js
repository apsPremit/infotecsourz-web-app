'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import Confetti from 'react-confetti';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const SuccessOrder = () => {
  //   const { width, height } = useWindowSize();
  const search = useSearchParams();
  const orderId = search.get('orderId');
  const message = search.get('message');
  console.log('message', message);

  const handleNavigate = () => {
    window.location.reload();
    window.location.href = '/dashboard';
  };

  return (
    <div className='rounded border  border-shadow  shadow-lg lg:w-2/5 '>
      <Confetti className='h-full w-full' />
      <div className='  rounded bg-white p-10'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='mx-auto mb-5 text-center text-5xl text-green-500'>
            {<IoIosCheckmarkCircleOutline className='text-center' />}
          </h1>
          <h1 className='text-lg'> #{orderId} </h1>
          <h1 className='mb-5 text-xl font-bold lg:text-2xl'>
            {message ? message : ' Order Placed successful!'}
          </h1>
          <p>Thank You</p>
          <button
            onClick={handleNavigate}
            className='my-5 rounded bg-main px-3 py-2.5 text-white hover:bg-mainHover'
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
