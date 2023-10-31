"use client"
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/components/authentication/SocialLogin/SocialLogin';
import { UserAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from '@/assets/images/logo.png';
import { useRouter, useSearchParams } from 'next/navigation';
import createJWT from '@/utils/functions/createJWT';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import getUserData from '@/utils/functions/getUserData';
import { ImSpinner2 } from 'react-icons/im';
import { baseUrl } from '@/utils/functions/baseUrl';
import { signIn } from 'next-auth/react'

const LoginForm = () => {
    const search = useSearchParams()
    const registerMessage = search.get('message')
    const { replace } = useRouter()
    const [isRemember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });



    const onSubmit = async (data) => {
        setError('')
        setLoading(true)
        const { email, password } = data || {}

        try {
            const res = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (data?.error) {
                setLoading(false)
                return setError(data?.error)
            }
            const setCookie = await fetch('http://localhost:5500/set-cookie')


            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/dashboard',
                redirect: true,
            })
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error?.error)
        }

        // await signIn('credentials', {
        //     email,
        //     password,
        //     callbackUrl: '/dashboard',
        //     redirect: true,
        // })
        // setLoading(false)


    }



    return (


        <div className=' py-12 px-5 lg:px-24'>
            <Image
                src={logo}
                alt='logo'
                width={56}
                height={50}
            />
            {
                registerMessage ? <div className='p-3 rounded border bg-green-500 text-white my-3'>
                    <p>{registerMessage}</p>
                </div>
                    :
                    <h2 className='text-3xl my-4'>Hey, hello</h2>
            }
            <p className='text-sm mb-3'>Enter the information you entered wrile registering.</p>
            <form onSubmit={handleSubmit(onSubmit)} action="">


                {/* ??????????????????email ****** */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="loginEmail">Email</label>
                    <input type="email"
                        id='loginEmail'
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



                {/* *******password********************* */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="loginPassword">Password</label>
                    <input type="password"
                        id='loginPassword'
                        className=' w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                    message: "Password must be 8+ characters and include at least one uppercase letter, one number, and one special character"
                                }
                            },
                        })}
                    />
                    {errors.password && <p className='text-xs mt-1 text-red-400' role="alert">{errors.password?.message}</p>}
                </div>




                {/* ********terms checkbox *******/}
                <div className='lg:flex items-center justify-center mt-5 px-2'>

                    <Link href='/password_reset' className='text-main hover:underline'>Forgot Password?</Link>
                </div>

                {
                    error && <p className='text-sm text-center text-red-500'>{error}</p>
                }
                {
                    loading && <div className='flex items-center justify-center text-xl text-main'><ImSpinner2 className='animate-spin' /></div>
                }
                <div>
                    <input disabled={loading} className='bg-main hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg my-5 cursor-pointer' type="submit" value="Login" />
                </div>
            </form>
            {/* <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div> */}

            {/* ************** social login ********** */}
            {/* <SocialLogin /> */}

            <p className='font-semibold text-center'>Don’t have an account? <Link href='/signup' className='text-main'>Signup</Link></p>
            <Toaster />
        </div>

    );
};

export default LoginForm;