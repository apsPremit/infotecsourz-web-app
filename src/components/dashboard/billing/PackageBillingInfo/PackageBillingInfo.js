'use client';
import { StateContext } from '@/context/StateProvider';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import React, { useContext } from 'react';

const PackageBillingInfo = ({ pack }) => {
  const session = useSession();
  const user = session?.data?.user;
  const { package_name, price, photos } = pack || {};

  const fields = [
    { label: 'Name', value: user?.name, type: 'text' },
    { label: 'Email', value: user?.email, type: 'text' },
    { label: 'Package name', value: package_name, type: 'text' },
    { label: 'Price', value: price, type: 'number' },
    { label: 'Credit', value: photos, type: 'number' },
  ];

  return (
    <div className='mx-auto mt-10 rounded bg-white p-10 lg:w-1/2'>
      <div className=' gap-5 space-y-4'>
        {fields.map((field, index) => (
          <div className='' key={index}>
            <label>
              <span className='mb-4 ml-1 text-sm text-[#9d9c9c]'>
                {field?.label}
              </span>
              <input
                type={field?.type}
                value={field?.value}
                className='w-full cursor-not-allowed rounded border border-shadow px-3 py-1.5 outline-0 focus:rounded focus:border-main'
                disabled
              />
            </label>
          </div>
        ))}
      </div>

      {/* btn proceed  */}
      <div className='mt-5 flex justify-center'>
        <Link href={`/dashboard/pricing/billing?package=${pack?.packageId}`}>
          <button className='flex rounded bg-main px-3.5 py-2 text-white hover:bg-mainHover disabled:cursor-not-allowed disabled:bg-mainHover'>
            Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PackageBillingInfo;
