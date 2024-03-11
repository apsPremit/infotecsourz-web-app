'use client';
import { baseUrl } from '@/utils/functions/baseUrl';
import { useRouter } from 'next/navigation';
import React from 'react';

const RevisionForm = ({ details }) => {
  console.log('details from from', details);
  const router = useRouter();
  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const formData = {
      orderId: details.orderId,
      email: details.email,
      description,
    };
    try {
      const response = await fetch(`${baseUrl}/revision`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('revision result', result);

      if (result.success) {
        router.push(`/dashboard/revision/success?orderId=${details?.orderId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' w-full rounded bg-white p-10 lg:w-1/2 '>
      <h1 className='mb-3 text-center text-xl font-semibold'>
        Revision Request
      </h1>
      <form onSubmit={handleRevisionSubmit}>
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='loginEmail'>
            Email<span className='text-red-500'>*</span>
          </label>
          <input
            defaultValue={details?.email}
            readOnly
            type='email'
            id='loginEmail'
            name='email'
            className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
          />
        </div>
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='loginEmail'>
            OrderId<span className='text-red-500'>*</span>
          </label>
          <input
            defaultValue={details.orderId}
            readOnly
            type='text'
            id='orderId'
            name='orderId'
            className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='dark:text-gray-400 mb-2 block text-sm font-medium text-gray-900'
          >
            Details
          </label>
          <textarea
            id='description'
            name='description'
            rows={6}
            required
            className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
            placeholder='Details...'
          />
        </div>
        <button
          type='submit'
          className='mt-10 w-full rounded bg-main px-3 py-2 text-white hover:bg-mainHover'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RevisionForm;
