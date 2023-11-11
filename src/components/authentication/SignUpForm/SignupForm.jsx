"use client"
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/components/authentication/SocialLogin/SocialLogin';
import logo from '@/assets/images/logo.png'
import { UserAuth } from '@/context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import createJWT from '@/utils/functions/createJWT';
import Cookies from 'js-cookie';
import saveUser from '@/utils/functions/saveUser';
import toast, { Toaster } from 'react-hot-toast';
import getUserData from '@/utils/functions/getUserData';
import { ImSpinner2 } from 'react-icons/im';
import { baseUrl } from '@/utils/functions/baseUrl';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './SignupForm.css'
import { signIn } from 'next-auth/react';


const SignUpForm = () => {
    const router = useRouter()
    const [isAgree, setAgree] = useState(false)
    const search = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [countries, setCountries] = useState([])
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });
    const password = watch("password", "");

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/apsPremit/country-code/main/country.json')
            .then(res => res.json())
            .then(data => {
                setCountries(data)
            })
    }, [])


    // submit form ***********

    const onSubmit = async ({ email, password, confirm_password, name, country, company }) => {
        setError('')
        console.log({ name, email, confirm_password, country, company })
        setLoading(true)

        try {
            const res = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ name, email, password: confirm_password, country, company })
            })

            const data = await res.json()
            if (data?.error) {
                setLoading(false)
                return setError(data?.error)
            }

            if (data?.message) {
                // router.replace(`/login?message=${data?.message}`)
                await signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/dashboard',
                    redirect: true,
                })
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
        }




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
                    <label className='block mb-1 text-sm' htmlFor="emailField">Full Name<span className='text-red-500'>*</span></label>
                    <input type="text"
                        id='emailField'
                        className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("name", { required: "Full Name is required" })}
                    />

                    {errors.name && <p className='text-xs mt-1 text-red-400' role="alert">{errors.name?.message}</p>}
                </div>

                {/* ??????????????????email ****** */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="signupEmail">Email <span className='text-red-500'>*</span></label>
                    <input type="email"
                        id='signupEmail'
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


                {/* <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="">Phone <span className='text-red-500'>*</span></label>
                    <PhoneInput
                        country={'us'}
                        onChange={(value, countryData) => {
                            setPhoneNumber(value)
                        }}

                        containerClass='w-full'
                        inputClass='py-5'
                    />
                    {phoneError && <p className='text-xs mt-1 text-red-400' role="alert">Phone is required</p>}
                </div> */}


                {/* *******password********************* */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="password">Password<span className='text-red-500'>*</span></label>

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
                    <label className='block mb-1 text-sm' htmlFor="confirmPassword">Confirm Password<span className='text-red-500'>*</span></label>

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


                {/* Country  */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="country">Country</label>
                    <select {...register('country')} defaultValue='' name="country" id="country" className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'>
                        <option value="">Select your Country</option>
                        {
                            countries[0]?.map(country => <option
                                key={country?.code}
                                value={country?.name}
                            >
                                {country?.name}
                            </option>)
                        }
                    </select>

                </div>

                {/* company  */}
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="company">Company</label>
                    <input type="text"
                        id='company'
                        className='w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main'
                        {...register("company")}
                    />
                </div>



                {/* ********terms checkbox *******/}
                <label htmlFor="checkbox" className='my-4 accent-main'>
                    <input
                        onChange={() => setAgree(!isAgree)}
                        checked={isAgree}
                        type="checkbox"
                        className='mr-2 '
                    />
                    <span className='text-sm'>I accept <Link target='_blank' href='https://www.infotecsourz.com/terms-and-conditions/' className='text-main hover:underline'>Terms & Conditions</Link></span>
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


            {/* <SocialLogin /> */}

            <p className='font-semibold text-center'>Already have an account? <Link href='/login' className='text-main'>Login</Link></p>
            <Toaster />
        </div>


    );
};

export default SignUpForm;