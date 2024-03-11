'use client';
import { UserAuth } from '@/context/AuthProvider';
import React from 'react';

import moment from 'moment';
import Link from 'next/link';

const PlanBox = ({ subscriptions }) => {
  const { userData } = UserAuth();
  if (!subscriptions) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  const currentSubscription = subscriptions[0];
  const {
    _id,
    orderId,
    OrderName,
    name,
    email,
    status,
    paymentStatus,
    invoiceStatus,
    package: pack,
    subtotal,
    taxRate,
    taxTotal,
    grandTotal,
    createdAt,
    paymentMethod,
    expiration,
    validity,
    credit,
    price,
    photos,
  } = currentSubscription || {};

  return (
    <div>
      <h1 className=' medium mb-3 ml-3 whitespace-nowrap text-2xl  text-gray-700'>
        My Plan
      </h1>
      <div className='rounded border bg-white p-10'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-xl font-bold capitalize text-gray-800'>
              {pack}
              <span className='ml-5 rounded-xl bg-blue-500 p-1.5 text-xs font-normal text-white'>
                Active
              </span>
            </h3>
            <p className='mt-3 text-sm text-red-400'>
              Your subscription will be expire on{' '}
              {moment(expiration).format('MMM D, YYYY')}
            </p>
          </div>
          <div>
            <h3 className='text-lg'>
              <span className='text-main'> ${price || '0'}</span> For{' '}
              {credit || '0'} Credit
            </h3>
            <p className='text-sm'>Validity {validity} Days</p>
            <p className='text-sm'>
              Subscribed on {moment(createdAt).format('MMM D, YYYY')}
            </p>
          </div>
        </div>

        <div className='mt-5 space-x-3'>
          <Link href='/dashboard/pricing'>
            <button className='rounded bg-main px-2.5 py-1.5 text-white hover:bg-mainHover'>
              Upgrade Plan
            </button>
          </Link>
          {/* <button className="bg-slate-200 text-black px-2.5 py-1.5 rounded hover:bg-slate-300">
            Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PlanBox;
