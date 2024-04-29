'use client';

import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';

const SubscribedPackage = ({ session }) => {
  const { userData } = useAuth();
  return (
    <div className='mg:grid-cols-2 mb-5 grid grid-cols-1 text-white lg:grid-cols-3  '>
      <div className='mt-3 rounded-lg bg-blue-500 px-5 pb-5 pt-2 shadow'>
        <p className='text-sm font-bold'>Subscribed Package</p>
        <p className='my-1 text-lg font-bold capitalize'>
          {userData?.subscription?.plan_name}
        </p>
        {userData?.subscription?.remaining_credit > 0 ? (
          <p className='text-sm'>
            Remaining Credit:
            <span className='font-bold'>
              {userData?.subscription?.remaining_credit}
            </span>
          </p>
        ) : (
          <Link href='/dashboard/pricing' className='text-sm'>
            Subscribe now
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubscribedPackage;
