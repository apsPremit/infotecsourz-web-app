"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png'
import Link from 'next/link';
import { UserAuth } from '@/context/AuthProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';


const ResetForm = () => {
    const { passwordReset } = UserAuth()
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async ({ email }) => {
        setError('')
        setLoading(true)
        try {

            const res = await fetch(`${baseUrl}/auth/send_reset_email`, {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (data?.error) {
                setLoading(false)
                reset()
                return setError(data?.error)
            }
            setLoading(false)
            reset()
            toast.success(data?.message)

        } catch (error) {
            setLoading(false)
            reset()
            setError('server error')
        }
    }

    return (
        <div className='bg-white p-12 rounded-lg'>
            <Image
                src={logo}
                alt='logo'
                width={56}
                height={50}
            />
            <h2 className='text-3xl my-4'>Forgot Password?</h2>
            <p className='text-sm mb-3 lg:w-10/12'>Please enter your email address so than we can verify it is you.</p>



            <form onSubmit={handleSubmit(onSubmit)} action="">
                {/* ??????????????????email ****** */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="otp_email">Email<span className='text-red-500'>*</span></label>
                    <input type="email"
                        id='otp_email'
                        className=' w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    {errors.email && <p className='text-xs mt-1 text-red-400' role="alert">{errors.email?.message}</p>}
                </div>
                {
                    error && <p className='text-sm text-red-500 my-2 text-center'>{error}</p>
                }
                {
                    loading && <div className='flex items-center justify-center text-xl text-main'><ImSpinner2 className='animate-spin' /></div>
                }

                <div>
                    <input disabled={loading} className='bg-main cursor-pointer hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg my-5' type="submit" value="Send Reset Email" />
                </div>
            </form>


            <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div>
            <p className='text-center font-semibold'>Try another way for <Link className='text-main' href="/login">Login</Link></p>
            <Toaster />
        </div>
    );
};

export default ResetForm;