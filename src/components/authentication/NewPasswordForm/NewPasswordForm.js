'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png';
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/utils/functions/baseUrl';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const NewPasswordForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  if (!token) {
    return router.replace('/password_reset');
  }

  const password = watch('new_password', '');
  const onSubmit = async ({ confirm_new_password }) => {
    setError('');
    try {
      const res = await fetch(`${baseUrl}/auth/reset_password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ token, password: confirm_new_password }),
      });
      const data = await res.json();

      if (data?.error) {
        reset();
        return setError(data?.error);
      }
      reset();
      toast.success(data?.message);
      router.push('/login');
    } catch (error) {
      reset();
      console.log(error);
      setError('server error');
    }
  };

  return (
    <div className='rounded-lg bg-white p-12'>
      <Image src={logo} alt='logo' width={56} height={50} />
      <h2 className='my-4 text-3xl'>Create New Password</h2>
      <p className='mb-3 text-sm '>
        Create a new password to get your account access.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} action=''>
        {/* *******new_password********************* */}
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='new_password'>
            New Password<span className='text-red-500'>*</span>
          </label>

          <Controller
            name='new_password'
            control={control}
            rules={{
              required: 'New password is required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                message:
                  'Password must be 8+ characters and include at least one uppercase letter, one number, and one special character',
              },
            }}
            render={({ field }) => (
              <input
                type='password'
                id='new_password'
                className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                {...field}
              />
            )}
          />

          {errors.new_password && (
            <p
              className='mt-1 whitespace-normal text-xs text-red-400 '
              role='alert'
            >
              {errors.new_password?.message}
            </p>
          )}
        </div>

        {/* ************confirm new password *************/}
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='confirm_new_password'>
            Confirm new Password<span className='text-red-500'>*</span>
          </label>

          <Controller
            name='confirm_new_password'
            control={control}
            rules={{
              required: 'Confirm new password is required',
              validate: (value) =>
                value === password || 'Confirm password must be matched',
            }}
            render={({ field }) => (
              <input
                type='password'
                id='confirm_new_password'
                className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                {...field}
              />
            )}
          />

          {errors.confirm_new_password && (
            <p
              className='mt-1 whitespace-break-spaces text-xs text-red-400'
              role='alert'
            >
              {errors.confirm_new_password?.message}
            </p>
          )}
        </div>
        {error && (
          <p className='my-2 text-center text-sm text-red-500'>{error}</p>
        )}
        <div>
          <input
            className='my-5 w-full cursor-pointer rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
            type='submit'
            value='Confirm'
          />
        </div>
      </form>

      <Toaster />
    </div>
  );
};

export default NewPasswordForm;
