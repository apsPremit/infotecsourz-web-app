'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import logo from '@/assets/images/logo.png';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { baseUrl } from '@/utils/functions/baseUrl';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const search = useSearchParams();
  const registerMessage = search.get('message');
  const { replace } = useRouter();
  const [isRemember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    const { email, password } = data || {};

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.error) {
        reset();
        setLoading(false);
        return setError(data?.error);
      }

      reset();
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
        redirect: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.error);
    }
  };

  return (
    <div className=' px-5 py-12 lg:px-24'>
      <div className='rounded border p-5 lg:p-10'>
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

          {/* ********terms checkbox *******/}
          <div className='mt-5 items-center justify-center px-2 lg:flex'>
            <Link href='/password_reset' className='text-main hover:underline'>
              Forgot Password?
            </Link>
          </div>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}
          {loading && (
            <div className='flex items-center justify-center text-xl text-main'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}
          <div>
            <input
              disabled={loading}
              className='my-5 w-full cursor-pointer rounded-lg bg-main px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
              type='submit'
              value='Login'
            />
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
