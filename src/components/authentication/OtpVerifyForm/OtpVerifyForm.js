'use client';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png';
import Link from 'next/link';

const OtpVerifyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email }) => {};

  return (
    <div className='rounded-lg bg-white p-12'>
      <Image src={logo} alt='logo' width={56} height={50} />
      <h2 className='my-4 text-3xl'>Verify Email Address</h2>
      <p className='mb-3 text-sm '>
        Enter the OTP we sent to your email address.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} action=''>
        {/* ??????????????????Otp ****** */}
        <div className='mb-3'>
          <label className='mb-1 block text-sm' htmlFor='otp'>
            OTP
          </label>
          <input
            type='text'
            id='otp'
            className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
            {...register('email', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'Invalid OTP',
              },
            })}
          />
          {errors.email && (
            <p className='mt-1 text-xs text-red-400' role='alert'>
              {errors.email?.message}
            </p>
          )}
        </div>
        <div>
          <input
            className='my-5 w-full rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
            type='submit'
            value='Confirm'
          />
        </div>
      </form>

      <div className='dark:text-gray-500 flex items-center py-6  uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-shadow after:ml-6 after:flex-[1_1_0%] after:border-t after:border-shadow'>
        Or
      </div>
      <p className='text-center font-semibold'>
        Didn’t get any code?{' '}
        <Link className='text-main' href='#'>
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OtpVerifyForm;
