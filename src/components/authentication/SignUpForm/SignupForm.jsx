'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImSpinner2 } from 'react-icons/im';
import 'react-phone-input-2/lib/style.css';
import './SignupForm.css';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import config from '@/config';
import { Toaster } from 'react-hot-toast';
import {
  useGetCountriesQuery,
  useRegisterMutation,
} from '@/redux/services/authApi';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUpForm = () => {
  const router = useRouter();
  const [isAgree, setAgree] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { data: countries } = useGetCountriesQuery();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const password = watch('password', '');

  // submit form ***********

  const onSubmit = async ({
    email,
    password,
    confirm_password,
    name,
    country,
    company,
  }) => {
    try {
      const payload = {
        name,
        email,
        password: confirm_password,
        country,
        company,
      };
      const response = await registerUser(payload);
      if (response?.error) {
        setError(response?.error?.data?.message || 'something went wrong!');
      }
      await signIn('credentials', {
        email,
        password,
        callbackUrl: `/dashboard/plans`,
        redirect: true,
      });
    } catch (error) {
      setError(error?.message);
    }
  };
  const onChange = (value) => {
    if (value) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };
  return (
    <div className='flex items-center justify-center flex-1'>
      <div className='rounded border p-5 lg:p-10'>
        <div className='flex flex-col items-center'>
          <Image src={logo} alt='logo' width={56} height={50} />
          <h2 className='my-4 text-3xl'>Signup</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action=''>
          {/* full name  */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='emailField'>
              Full Name<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='emailField'
              className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
              {...register('name', { required: 'Full Name is required' })}
            />

            {errors.name && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.name?.message}
              </p>
            )}
          </div>

          {/* ??????????????????email ****** */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='signupEmail'>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='signupEmail'
              className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* *******password********************* */}
          {/* *******password********************* */}
          <div className='relative mb-5'>
            <label className='mb-1 block text-sm' htmlFor='password'>
              Password<span className='text-red-500'>*</span>
            </label>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute end-0 mr-[3px] mt-[2px] flex h-[35px] items-center rounded-r-md bg-white px-2 '
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                  message:
                    'Password must be 8+ characters and include at least one uppercase letter, one number, and one special character',
                },
              }}
              render={({ field }) => (
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                  {...field}
                />
              )}
            />

            {errors.password && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.password?.message}
              </p>
            )}
          </div>

          {/* ************confirm password *************/}
          <div className='relative mb-5'>
            <label className='mb-1 block text-sm' htmlFor='confirmPassword'>
              Confirm Password<span className='text-red-500'>*</span>
            </label>
            <span
              onClick={() => setShowCPassword(!showCPassword)}
              className='absolute end-0 mr-[3px] mt-[2px] flex h-[35px] items-center rounded-r-md bg-white px-2 '
            >
              {showCPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>

            <Controller
              name='confirm_password'
              control={control}
              rules={{
                required: 'confirm password is required',
                validate: (value) =>
                  value === password || 'Passwords must match',
              }}
              render={({ field }) => (
                <input
                  type={showCPassword ? 'text' : 'password'}
                  id='confirm_password'
                  className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                  {...field}
                />
              )}
            />

            {errors.confirm_password && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.confirm_password?.message}
              </p>
            )}
          </div>

          {/* Country  */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='country'>
              Country<span className='text-red-500'>*</span>
            </label>
            <select
              {...register('country', { required: 'Country is required' })}
              defaultValue=''
              name='country'
              id='country'
              className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
            >
              <option value=''>Select your Country</option>
              {countries?.length > 0 &&
                countries[0]?.map((country) => (
                  <option key={country?.code} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
            </select>
            {errors.country && (
              <p className='mt-1 text-xs text-red-400' role='alert'>
                {errors.country?.message}
              </p>
            )}
          </div>
          {/* company  */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='company'>
              Company
            </label>
            <input
              type='text'
              id='company'
              className='w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
              {...register('company')}
            />
          </div>

          {/* ********terms checkbox *******/}
          <div>
            <label
              htmlFor='agree_terms'
              className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'
            >
              <input
                onChange={() => setAgree(!isAgree)}
                id='agree_terms'
                checked={isAgree}
                type='checkbox'
                className='scale-125 mt-1'
              />
              <p className='text-sm'>
                I accept{' '}
                <Link
                  target='_blank'
                  href='https://www.infotecsourz.com/terms-and-conditions/'
                  className='text-main hover:underline'
                >
                  Terms
                </Link>
                <span className='px-2'>&</span>
                <Link
                  target='_blank'
                  href='https://www.infotecsourz.com/privacy-policy/'
                  className='text-main hover:underline'
                >
                  Privacy policy
                </Link>
              </p>
            </label>
          </div>
          {error && <p className='text-center text-sm text-red-500'>{error}</p>}
          {loading && (
            <div className='flex items-center justify-center text-xl text-main'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}
          <div className='flex items-center justify-center '>
            {isAgree && (
              <ReCAPTCHA
                badge='inline'
                type='image'
                sitekey='6LfnnzQqAAAAAFFTCUdEI3WEtUTpmlUP5l6radc7'
                onChange={onChange}
                className=' flex items-center justify-center '
              />
            )}
          </div>
          <div>
            <input
              disabled={!isAgree || !isVerified}
              className='mb-5 mt-3 w-full cursor-pointer rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
              type='submit'
              value='Sign Up'
            />
          </div>
        </form>

        <p className='text-center font-semibold'>
          Already have an account?{' '}
          <Link href='/login' className='text-main'>
            Login
          </Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
};

export default SignUpForm;
