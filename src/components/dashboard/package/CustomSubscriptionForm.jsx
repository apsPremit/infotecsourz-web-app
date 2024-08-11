'use client';
import { useAuth } from '@/context/AuthProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import config from '@/config';
import { useSession } from 'next-auth/react';
import { customSubscriptionValidationSchema } from '@/validations/customSubscriptionValidationSchema';
const CustomSubscriptionForm = () => {
  const session = useSession();
  const { userData } = useAuth();
  const user = session?.data?.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customSubscriptionValidationSchema),
  });

  const onsubmit = async (data) => {
    try {
      const payloadData = {
        userId: userData?.id,
        billType: data.billType,
        credit: data.credit,
        description: data.description || null,
      };
      const response = await axios.post(
        `${config.api_base_url}/custom-subscription-requests/create-request`,
        payloadData,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      const result = await response.data;
      toast.success('your request sent! you will be notified soon');
      reset();
    } catch (error) {
      const message = error?.response?.data?.message || 'something went wrong!';
      toast.error(message);
    }
  };

  return (
    <section className=' dark:bg-gray-900'>
      <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md border bg-white mt-10  rounded'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white'>
          Custom Plan
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl'>
          Subscribe now to enjoy exclusive benefits and personalized offers
          tailored just for you!
        </p>
        <form onSubmit={handleSubmit(onsubmit)} className='space-y-8'>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email
            </label>
            <input
              type='email'
              defaultValue={userData?.email}
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='name@flowbite.com'
              readOnly
              {...register('email')}
            />
            {errors?.email && (
              <p className='text-red-500'>{errors?.email?.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              How many credit do you need?
            </label>
            <input
              type='number'
              id='credit'
              name='credit'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='Give your needed credit'
              {...register('credit', { valueAsNumber: true })}
            />
            {errors?.credit && (
              <p className='text-red-500'>{errors?.credit?.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='bill_type'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Bill Type
            </label>
            <select
              defaultValue='yearly'
              id='bill_type'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              {...register('billType')}
            >
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select>
            {errors?.billType && (
              <p className='text-red-500'>{errors?.billType?.message}</p>
            )}
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              rows={6}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Description...'
              {...register('description')}
            />
            {errors?.description && (
              <p className='text-red-500'>{errors?.description?.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='bg-main px-3 py-2.5 text-white hover:bg-mainHover rounded '
          >
            Send Request
          </button>
        </form>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </section>
  );
};

export default CustomSubscriptionForm;
