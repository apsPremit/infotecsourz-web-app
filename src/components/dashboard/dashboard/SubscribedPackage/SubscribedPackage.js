'use client';
import { UserAuth } from '@/context/AuthProvider';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SubscribedPackage = () => {
  const { userData } = UserAuth();

  return (
    <div className='mg:grid-cols-2 mb-5 grid grid-cols-1 text-white lg:grid-cols-3  '>
      <div className='mt-3 rounded-lg bg-blue-500 px-5 pb-5 pt-2 shadow'>
        <p className='text-sm font-bold'>Subscribed Package</p>
        <p className='my-1 text-lg font-bold capitalize'>
          {userData?.subscribedPackage}
        </p>
        {userData?.remainingCredit ? (
          <p className='text-sm'>
            Remaining Credit:
            <span className='font-bold'>{userData?.remainingCredit}</span>
          </p>
        ) : (
          <Link href='/dashboard/pricing'>
            <p className='text-sm font-bold hover:underline'>Subscribe Now</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubscribedPackage;
