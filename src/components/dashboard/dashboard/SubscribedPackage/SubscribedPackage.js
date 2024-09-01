'use client';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthProvider';
import React from 'react';

const SubscribedPackage = () => {
  const { userData } = useAuth();
  return (
    <div className='grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 mb-5 text-white  '>
      <div className={`mt-3 px-5 pt-2 pb-5 rounded-lg shadow bg-blue-500`}>
        <p className='text-sm font-bold'>Subscribed Package</p>
        {userData?.subscription ? (
          <p className='text-lg font-bold my-1 capitalize'>
            {userData?.subscription.plan_name}
          </p>
        ) : (
          <Link href='/dashboard/plans'>
            <p className='text-lg font-bold my-1 capitalize'>Subscribe Now</p>
          </Link>
        )}
        {userData?.subscription &&
          userData?.subscription?.plan_type !== 'pay-as-go' && (
            <>
              <p className='text-sm'>
                <span className='pr-1'> Remaining Credit:</span>
                <span className='font-bold pe-1'>
                  {userData?.subscription?.remaining_credit || '0'}
                </span>
              </p>
            </>
          )}
      </div>
    </div>
  );
};

export default SubscribedPackage;
