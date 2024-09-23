'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import logo from '@/assets/images/logo.png';
import { Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useVerifyLoginMutation } from '@/redux/services/authApi';
import Spinner from '@/components/ui/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const [verifyLogin, { isLoading }] = useVerifyLoginMutation();
  const onSubmit = async (data) => {
    const { email, password } = data || {};

    try {
      const response = await verifyLogin(data);
      if (response?.error) {
        setError(response?.error?.data?.message || 'something went wrong!');
      }
      if (response?.data) {
        reset();
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/dashboard',
          redirect: true,
        });
      }
    } catch (error) {
      setError(error?.error);
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
    <div className='px-5 h-screen  w-full flex-1 mx-auto flex items-center justify-center'>
      <div className='rounded border px-5 p-5 w-full md:w-3/4 xl:w-1/2'>
        <div className='flex flex-col items-center'>
          <Image src={logo} alt='logo' width={56} height={50} />
          <h2 className='my-4 text-3xl'>Login</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} action=''>
          {/* ??????????????????email ****** */}
          <div className='mb-5'>
            <label className='mb-1 block text-sm' htmlFor='loginEmail'>
              Email<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='loginEmail'
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
          <div className='flex items-center justify-center '>
            <ReCAPTCHA
              badge='inline'
              type='image'
              sitekey='6LfnnzQqAAAAAFFTCUdEI3WEtUTpmlUP5l6radc7'
              onChange={onChange}
              className=' flex items-center justify-center '
            />
          </div>
          {/* ********terms checkbox *******/}
          <div className='mt-5 items-center justify-center px-2 lg:flex'>
            <Link href='/forget-password' className='text-main hover:underline'>
              Forgot Password?
            </Link>
          </div>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}

          <div>
            <button
              disabled={!verified | isLoading}
              className='my-5 w-full cursor-pointer rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
              type='submit'
              value='Login'
            >
              <span className='flex items-center justify-center gap-2'>
                Login
                {isLoading && <Spinner />}
              </span>
            </button>
          </div>
        </form>

        <p className='text-center font-semibold'>
          Don’t have an account?{' '}
          <Link href='/signup' className='text-main'>
            Signup
          </Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
};

export default LoginForm;
