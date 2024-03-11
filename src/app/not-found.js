import Link from 'next/link';
import React from 'react';
export const metadata = {
  title: 'Not Found | Infotecsourz',
  description: 'Photo Retouching App',
};
const notFound = () => {
  return (
    <div>
      <div className='flex min-h-screen w-screen items-center justify-center bg-main'>
        <div className='flex min-h-[300px] w-full flex-col items-center justify-center rounded bg-white p-5 text-center md:w-1/3'>
          <h1 className='text-7xl font-bold'>
            4<span className='px-3 text-main'>0</span>4
          </h1>
          <h3 className='my-3 text-lg font-bold uppercase'>
            The page you requested not found
          </h3>
          <Link href='/dashboard'>
            <button className='mt-5 rounded bg-main px-3 py-2 text-white hover:bg-mainHover'>
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notFound;
