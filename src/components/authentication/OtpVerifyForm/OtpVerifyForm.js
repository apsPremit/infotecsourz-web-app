"use client"
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png'
import Link from 'next/link';


const OtpVerifyForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = ({ email }) => {

    }

    return (
        <div className='bg-white p-12 rounded-lg'>
            <Image
                src={logo}
                alt='logo'
                width={56}
                height={50}
            />
            <h2 className='text-3xl my-4'>Verify Email Address</h2>
            <p className='text-sm mb-3 '>Enter the OTP we sent to your email address.</p>



            <form onSubmit={handleSubmit(onSubmit)} action="">
                {/* ??????????????????Otp ****** */}
                <div className='mb-3'>
                    <label className='block mb-1 text-sm' htmlFor="otp">OTP</label>
                    <input type="text"
                        id='otp'
                        className=' w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("email", {
                            required: "OTP is required",
                            pattern: {
                                value: /^\d{6}$/,
                                message: 'Invalid OTP',
                            },
                        })}
                    />
                    {errors.email && <p className='text-xs mt-1 text-red-400' role="alert">{errors.email?.message}</p>}
                </div>
                <div>
                    <input className='bg-main hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg my-5' type="submit" value="Confirm" />
                </div>
            </form>


            <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div>
            <p className='text-center font-semibold'>Didn’t get any code?  <Link className='text-main' href="#">Resend</Link></p>
        </div>
    );
};

export default OtpVerifyForm;