import React from 'react';
import Link from 'next/link';

const Plans = async () => {
  return (
    <div className=' mx-auto mb-[120px] w-full lg:w-3/4'>
      <h1 className='text-capitalize mb-5 mt-3 text-center text-3xl font-bold'>
        Welcome to Photo Retouching app!
      </h1>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10'>
        <div className='rounded border bg-white p-10'>
          <div className='text-center'>
            <h1 className='mb-5 text-xl font-bold '>Start Free Trial</h1>
            <p>
              Enjoy 3 free credits on us to elevate your photos with our Photo
              Retouching App – a special gift just for you! your trial is valid
              for 14 days!
            </p>

            <Link href={`/dashboard/pricing`}>
              <button className='mt-5 w-full bg-blue-400 py-2 text-white hover:bg-blue-500 disabled:bg-blue-200 '>
                Get Free Trial
              </button>
            </Link>
          </div>
        </div>
        <div className='rounded border bg-white p-10 text-center'>
          <div>
            <h1 className='mb-5 text-xl font-bold '>See All Packages</h1>
            <p>
              Explore our complete range of packages by clicking here, and
              unlock the full potential of photo enhancement tailored just for
              you.
            </p>
            <Link href='/dashboard/pricing'>
              <button className='mt-5 w-full bg-blue-400 py-2 text-white hover:bg-blue-500 '>
                See All Packages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
