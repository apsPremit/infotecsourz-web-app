'use client';

import { StateContext } from '@/context/StateProvider';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import paymentMethods from '../../../../../public/images/others/payment_methods.png';
import bank_transfer from '../../../../../public/images/others/bank_transfer.png';

const BillingLeftSide = () => {
  const { setBillingMessage, paymentMethod, setPaymentMethod } =
    useContext(StateContext);

  return (
    <div className='rounded bg-white p-5'>
      <h3 className='mb-3 text-xl font-bold'>
        You’re almost there! Complete your order
      </h3>
      <h3 className='mb-2 mt-5'>Select Payment method</h3>

      <div className=''>
        <label
          htmlFor='paypal_credit'
          className='courser-pointer mb-5 grid grid-cols-2 items-center rounded border px-3 py-2'
        >
          <div className='flex items-center gap-2 font-bold'>
            <input
              onChange={(e) => setPaymentMethod(e.target.value)}
              value='paypal / credit card'
              id='paypal_credit'
              type='radio'
              className='h-4 w-4 accent-main'
              checked={paymentMethod === 'paypal / credit card'}
            />
            <p className='whitespace-nowrap'>Paypal / Credit Card</p>
          </div>
          <Image alt='payment methods' src={paymentMethods} width={200} />
        </label>
        <label
          htmlFor='bank_transfer'
          className='courser-pointer grid grid-cols-2 items-center rounded border px-3 py-2'
        >
          <div className='flex items-center  gap-2 font-bold'>
            <input
              onChange={(e) => setPaymentMethod(e.target.value)}
              value='bank transfer'
              id='bank_transfer'
              type='radio'
              className='h-4 w-4 accent-main'
              checked={paymentMethod === 'bank transfer'}
            />
            <p className='whitespace-nowrap'>Bank Transfer</p>
          </div>
          <Image alt='payment methods' src={bank_transfer} height={45} />
        </label>
      </div>
    </div>
  );
};

export default BillingLeftSide;
