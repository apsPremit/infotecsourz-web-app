'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

const CreditBuyForm = ({ plan }) => {
  const [credit, setCredit] = useState(0);
  const { userData } = useAuth();
  const router = useRouter();
  const perCreditCost = plan.price / plan.credit;

  const perPrice = perCreditCost;
  const orderDetails = { credit, price: credit * perPrice };
  return (
    <div className='p-5 border rounded w-full lg:w-1/3 mx-auto bg-white'>
      <h3 className='font-bold text-center my-5'>Buy Credit</h3>

      <div className='mb-5 flex justify-between items-center'>
        <label className='mb-1 block text-sm' htmlFor='loginEmail'>
          Plan
        </label>
        <div>
          <p>{userData?.subscription?.plan_name}</p>
        </div>
      </div>
      <div className='mb-5 flex justify-between items-center'>
        <label className='mb-1 block text-sm' htmlFor='loginEmail'>
          Credit
        </label>
        <div>
          <input
            onChange={(e) => setCredit(e.target.value)}
            type='number'
            className='border text-end outline-none rounded max-w-[100px] transition-all focus:outline-main focus-outline-2'
            defaultValue={credit}
          />
        </div>
      </div>
      <div className='mb-5 flex justify-between items-center'>
        <label className='mb-1 block text-sm' htmlFor='loginEmail'>
          Per credit
        </label>
        <div>
          <p className=''>${parseFloat(perPrice).toFixed(2)}</p>
        </div>
      </div>
      <hr className='bg-main h-0.5' />
      <div className='mb-5 flex justify-between items-center mt-2'>
        <label className='mb-1 block ' htmlFor='loginEmail'>
          Total
        </label>
        <div>
          <p className='font-bold'>${orderDetails.price}.00</p>
        </div>
      </div>
      <button
        disabled={credit < 1}
        onClick={() =>
          router.push(
            `/dashboard/credit-checkout?price=${encodeURIComponent(
              orderDetails.price
            )}&&credit=${encodeURIComponent(
              orderDetails.credit
            )}&&sub=${encodeURIComponent(userData?.subscription?.id)}`
          )
        }
        className='px-3 py-2.5 rounded bg-main hover:bg-mainHover disabled:bg-violet-300 transition-all text-white w-full my-5 '
      >
        Checkout
      </button>
    </div>
  );
};

export default CreditBuyForm;
