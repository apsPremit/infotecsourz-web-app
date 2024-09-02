'use client';
import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { IoIosWarning } from 'react-icons/io';

const NotificationToast = () => {
  const { userData } = useAuth();
  const isActive = userData?.subscription?.status === 'active';
  if (!userData || !userData.subscription || isActive) {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <div className=' flex justify-center'>
        <div className='border p-2 flex items-center gap-2 bg-white rounded shadow-lg'>
          <span>
            <IoIosWarning size={25} className='text-red-500' />
          </span>
          <p className='text-red-500'>
            Your subscription has been expired. Please
            <Link href='/dashboard/plans' className='text-main underline'>
              upgrade
            </Link>
            your plan
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default NotificationToast;
