"use client"
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/components/authentication/SocialLogin/SocialLogin';
import logo from '@/assets/images/logo.png'
import { UserAuth } from '@/context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import createJWT from '@/utils/functions/createJWT';
import Cookies from 'js-cookie';
import saveUser from '@/utils/functions/saveUser';
import toast, { Toaster } from 'react-hot-toast';
import getUserData from '@/utils/functions/getUserData';
import { ImSpinner2 } from 'react-icons/im';


const SignUpForm = () => {
    const router = useRouter()
    const { user, registerWithEmailAndPassword, profileUpdate, loading, setLoading } = UserAuth()
    const [isAgree, setAgree] = useState(false)
    const search = useSearchParams()
    const { replace } = useRouter()
    const [error, setError] = useState('')
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });
    const password = watch("password", "");

    // submit form ***********

    const onSubmit = ({ email, password, confirm_password, name }) => {

        registerWithEmailAndPassword(email, password)
            .then(() => {
                profileUpdate({ displayName: name }).
                    then(async (result) => {
                        const newUser = { name, email }
                        saveUser(newUser)


                        // create JWT
                        const token = await createJWT({ email })
                        Cookies.set('access-token', token?.accessToken, { expires: 2 })


                        setLoading(false)
                        router.push('/dashboard')

                    })
                    .catch(err => {
                        setLoading(false)
                        setError(err?.code.split('/')[1]?.replace('-', ' '))
                    })
            })
            .catch(err => {
                setLoading(false)
                setError(err?.code?.split('/')[1]?.replace('-', ' '))
            })
    }





    return (

        <div className=' py-12 px-5 lg:px-24'>
            <Image
                src={logo}
                alt='logo'
                width={56}
                height={50}
            />
            <h2 className='text-3xl my-4'>Welcome</h2>
            <p className='text-sm mb-3'>Enter the information you entered write registering.</p>
            <form onSubmit={handleSubmit(onSubmit)} action="">

                {/* full name  */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="emailField">Full Name</label>
                    <input type="text"
                        id='emailField'
                        className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("name", { required: "Full Name is required" })}
                    />

                    {errors.name && <p className='text-xs mt-1 text-red-400' role="alert">{errors.name?.message}</p>}
                </div>

                {/* ??????????????????email ****** */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="email">Email</label>
                    <input type="email"
                        id='email'
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
                    <label className='block mb-1 text-sm' htmlFor="password">Password</label>

                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: 'password is required',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                message: "Password must be 8+ characters and include at least one uppercase letter, one number, and one special character"
                            }
                        }}
                        render={({ field }) => <input
                            type='password'
                            id='password'
                            className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                            {...field}

                        />}
                    />

                    {errors.password && <p className='text-xs mt-1 text-red-400' role="alert">{errors.password?.message}</p>}
                </div>

                {/* ************confirm password *************/}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="confirmPassword">Confirm Password</label>

                    <Controller
                        name='confirm_password'
                        control={control}
                        rules={{
                            required: 'confirm password is required',
                            validate: (value) =>
                                value === password || 'Passwords must match',
                        }}
                        render={({ field }) => <input
                            type='password'
                            id='confirm_password'
                            className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                            {...field}
                        />}
                    />

                    {errors.confirm_password && <p className='text-xs mt-1 text-red-400' role="alert">{errors.confirm_password?.message}</p>}
                </div>


                {/* ********terms checkbox *******/}
                <label htmlFor="checkbox" className='my-4 accent-main'>
                    <input
                        onChange={() => setAgree(!isAgree)}
                        checked={isAgree}
                        type="checkbox"
                        className='mr-2 ' />
                    <sapn className='text-sm'>I accept <Link target='_blank' href='https://www.infotecsourz.com/terms-and-conditions/' className='text-main hover:underline'>Terms & Conditions</Link></sapn>
                </label>
                {
                    error && <p className='text-sm text-center text-red-500'>{error}</p>
                }
                {
                    loading && <div className='flex items-center justify-center text-xl text-main'><ImSpinner2 className='animate-spin' /></div>
                }
                <div>
                    <input disabled={!isAgree} className='bg-main cursor-pointer hover:bg-[#5736ce] disabled:bg-opacity-50 py-3 px-3 text-center text-white font-bold w-full rounded-lg mt-3 mb-5' type="submit" value="Sign Up" />
                </div>
            </form>
            <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div>

            {/* ************** social login ********** */}

            <SocialLogin />

            <p className='font-semibold text-center'>Already have an account? <Link href='/login' className='text-main'>Login</Link></p>
            <Toaster />
        </div>


    );
};

export default SignUpForm;