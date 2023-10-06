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
import toast from 'react-hot-toast';
import getUserData from '@/utils/functions/getUserData';

const LoginForm = () => {
    const search = useSearchParams()
    const { replace } = useRouter()
    const { loginWthEmailAndPassword, user, loading } = UserAuth()
    const [isRemember, setRemember] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });


    const onSubmit = (data) => {

        const { email, password } = data || {}

        loginWthEmailAndPassword(email, password)
            .then(async result => {
                // set token 
                const token = await createJWT({ email })
                Cookies.set('access-token', token?.accessToken, { expires: 2 })

                const redirectUrl = '/dashboard'
                replace(redirectUrl)

            })
            .catch(err => setError(err?.code?.split('/')[1]?.replace('-', ' ')))
    }



    return (


        <div className=' py-12 px-5 lg:px-24'>
            <Image
                src={logo}
                alt='logo'
                width={56}
                height={50}
            />
            <h2 className='text-3xl my-4'>Hey, hello</h2>
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
                        id='loginEmail'
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
                    {/* <label htmlFor="checkbox  ">
                        <input
                            onChange={() => setRemember(!isRemember)}
                            checked={isRemember}
                            type="checkbox"
                            className='mr-2 accent-main' />
                        <sapn className='text-sm'>Remember Me </sapn>
                    </label> */}
                    <Link href='/password_reset' className='text-main hover:underline'>Forgot Password?</Link>
                </div>

                {
                    error && <p className='text-sm text-center text-red-500'>{error}</p>
                }
                <div>
                    <input className='bg-main hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg my-5 cursor-pointer' type="submit" value="Login" />
                </div>
            </form>
            <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div>

            {/* ************** social login ********** */}
            <SocialLogin />

            <p className='font-semibold text-center'>Don’t have an account? <Link href='/signup' className='text-main'>Signup</Link></p>
        </div>

    );
};

export default LoginForm;