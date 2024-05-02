import Link from 'next/link';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const SubscriptionSuccess = () => {
  return (
    <div className=' flex justify-center items-center h-screen bg-main bg-opacity-25 '>
      <div className='bg-white border rounded-md w-full md:w-1/3 mx-auto'>
        <div className='w-full bg-main h-[50%] rounded-md text-white flex items-center justify-center py-10'>
          <RiCheckboxCircleFill size={50} className=' ' />
        </div>
        <div className='p-5'>
          <h1 className=' font-bold text-gray-500 text-center text-3xl my-5'>
            Congratulation!
          </h1>
          <p className='text-gray-700 text-center mt-4 px-4'>
            You&apos;ve successfully subscribed and unlocked all the amazing
            features.
          </p>
          <div className='flex justify-center my-3'>
            <Link href='/dashboard'>
              <button className='px-2 py-1.5 bg-main hover:bg-mainHover transition-all text-white rounded'>
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
