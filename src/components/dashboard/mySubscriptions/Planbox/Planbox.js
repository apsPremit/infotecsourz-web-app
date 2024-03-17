'use client';

import React from 'react';

import moment from 'moment';
import Link from 'next/link';

const PlanBox = ({ subscription }) => {
  const {
    plan_name,
    total_credit,
    transaction,
    validity,
    createdAt,
    status,
    free_credit,
    plan_type,
    expiration,
  } = subscription || {};

  return (
    <div>
      <h1 className=' medium mb-3 ml-3 whitespace-nowrap text-2xl  text-gray-700'>
        My Plan
      </h1>
      <div className='rounded border bg-white p-10'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-xl font-bold capitalize text-gray-800'>
              {plan_name}
              <span className='ml-5 rounded-xl bg-blue-500 p-1.5 text-xs font-normal text-white'>
                {status}
              </span>
            </h3>
            {plan_type !== 'pay-as-go' && (
              <p className='text-red-400 mt-3 text-sm'>
                Your subscription will be expire on{' '}
                {moment(expiration).format('MMM D, YYYY')}
              </p>
            )}
            {/* upgrade button  */}
            <div className='mt-5 space-x-3'>
              <Link href='/dashboard/pricing'>
                <button className='rounded bg-main px-2.5 py-1.5 text-white hover:bg-mainHover'>
                  Upgrade Plan
                </button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className='text-lg'>
              {plan_type !== 'pay-as-go' && (
                <span className='text-main'>
                  ${transaction?.total_amount || '0'} For{' '}
                </span>
              )}
              {total_credit || free_credit || ' Unlimited'} Credit
            </h3>
            <p className='text-sm'>
              {plan_type === 'pay-as-go'
                ? 'Unlimited Validity'
                : 'Validity' + ' ' + validity + ' ' + 'Days'}
            </p>
            <p className='text-sm'>
              Subscribed on {moment(createdAt).format('MMM D, YYYY')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanBox;
