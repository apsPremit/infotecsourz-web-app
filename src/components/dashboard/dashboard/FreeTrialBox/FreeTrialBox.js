'use client';
import React from 'react';
import { BsImageAlt } from 'react-icons/bs';
import Link from 'next/link';

const FreeTrialBox = ({ session }) => {
  console.log({ session });
  return (
    <>
      {session?.user?.able_free_trial && (
        <div className='rounded border border-shadow bg-white p-5'>
          <div className=''>
            <p className='border-red-20 flex h-8 w-8 items-center justify-center rounded-full border bg-green-200 p-1.5 text-xl text-green-500'>
              <BsImageAlt className='' />
            </p>
          </div>
          <div className='mt-3'>
            <p className='text-lg  font-bold'>3 Credits</p>
            <h3 className='text  text-sm text-[#9f9f9f]'>
              Get 3 Credits for Free trial!
            </h3>

            <Link href='/dashboard/pricing'>
              <button className='disable:bg-mainHover mt-3 rounded bg-main px-3 py-1.5 text-white hover:bg-mainHover disabled:cursor-not-allowed'>
                Get Free Trial
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FreeTrialBox;
