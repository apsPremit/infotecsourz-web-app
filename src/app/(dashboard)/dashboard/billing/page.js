import BillingRightSide from '@/components/dashboard/billing/BillingRightSide/BillingRightSide';
import Link from 'next/link';
import React from 'react';
import { FaFire } from 'react-icons/fa';

export const metadata = {
  title: 'Billing | Infotecsourz',
  description: 'Photo Retouching App',
};

const Billing = () => {
  return (
    <div className='mx-auto w-full md:w-3/4 lg:w-1/2 lg:px-10'>
      <div>{/* <BillingLeftSide /> */}</div>
      <div className=''>
        <BillingRightSide />
      </div>
    </div>
  );
};

export default Billing;
