import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const CustomPlan = ({ facilities }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className={`border-shadow rounded p-5 shadow relative bg-white`}>
      <div className='min-h-[52px]'>
        <h1 className='font-bold text-2xl capitalize'>Custom Plan</h1>
        <p className='text-sm font-normal'>Enterprise solutions for business</p>
      </div>

      <hr className='my-3' />

      <div className='min-h-[150px]'>
        <ul className='mb-5'>
          <li className='list-inside list-disc'>Unlimited Credits</li>
          <li className='list-inside list-disc'>Unlimited Photos</li>

          <li className='list-inside list-disc'>12-72 Turn around time</li>
          <li className='list-inside list-disc'>All services included</li>
        </ul>

        <div>
          <div className='flex b flex-col'>
            <div className='flex justify-start'>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className='text-blue-500 underline'
              >
                More Features
              </button>
            </div>
            <div className={`${showDetails ? '' : 'hidden'}`}>
              <ul className='list-inside list-disc'>
                {facilities?.map((item, i) => (
                  <p key={i} className='gap-x-2 flex items-center my-2'>
                    <span className='text-sm'>
                      {' '}
                      <IoMdCheckmark color={'green'} />
                    </span>
                    <span>{item}</span>
                  </p>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='group relative  flex justify-center'>
          <Link
            href='/dashboard/pricing/custom'
            disabled
            className='py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full text-center '
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomPlan;
