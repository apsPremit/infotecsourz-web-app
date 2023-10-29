"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import logo from '@/assets/images/logo.png'
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/utils/functions/baseUrl';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';



const NewPasswordForm = () => {

    const { register, reset, handleSubmit, control, watch, formState: { errors } } = useForm();
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const [error, setError] = useState('')
    if (!token) {
        return router.replace('/password_reset')
    }

    const password = watch("new_password", "");
    const onSubmit = async ({ confirm_new_password }) => {
        setError('')
        try {
            const res = await fetch(`${baseUrl}/auth/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, password: confirm_new_password })
            })
            const data = await res.json()

            if (data?.error) {
                reset()
                return setError(data?.error)
            }
            reset()
            toast.success(data?.message)
            router.push('/login')

        } catch (error) {
            reset()
            console.log(error)
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
            <h2 className='text-3xl my-4'>Create New Password</h2>
            <p className='text-sm mb-3 '>Create a new password to get your account access.</p>



            <form onSubmit={handleSubmit(onSubmit)} action="">

                {/* *******new_password********************* */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="new_password">New Password</label>

                    <Controller
                        name='new_password'
                        control={control}
                        rules={{
                            required: 'New password is required',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                message: "Password must be 8+ characters and include at least one uppercase letter, one number, and one special character"
                            }
                        }}
                        render={({ field }) => <input
                            type='password'
                            id='new_password'
                            className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                            {...field}

                        />}
                    />

                    {errors.new_password && <p className='text-xs mt-1 text-red-400 whitespace-normal ' role="alert">{errors.new_password?.message}</p>}
                </div>

                {/* ************confirm new password *************/}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="confirm_new_password">Confirm new Password</label>

                    <Controller
                        name='confirm_new_password'
                        control={control}
                        rules={{
                            required: 'Confirm new password is required',
                            validate: (value) =>
                                value === password || 'Confirm password must be matched',
                        }}
                        render={({ field }) => <input
                            type='password'
                            id='confirm_new_password'
                            className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                            {...field}
                        />}
                    />

                    {errors.confirm_new_password && <p className='text-xs mt-1 text-red-400 whitespace-break-spaces' role="alert">{errors.confirm_new_password?.message}</p>}
                </div>
                {
                    error && <p className='text-red-500 text-center my-2 text-sm'>{error}</p>
                }
                <div>
                    <input className='bg-main cursor-pointer hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg my-5' type="submit" value="Confirm" />
                </div>
            </form>

            <Toaster />

        </div>
    );
};

export default NewPasswordForm;