import { UserAuth } from '@/context/AuthProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const PasswordChangeForm = () => {
  const { userData } = UserAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await fetch(
        `${baseUrl}/auth/change_password/${userData?.email}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (result?.error) {
        reset();
        return setError(result?.error);
      }

      toast.success('Password changed');
      reset();
    } catch (error) {
      reset();
      setError(error?.message);
    }
  };

  return (
    <div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5 rounded bg-white p-5'>
          <h3 className='mb-5  text-xl'>Change Password</h3>

          {/* *******Old password********************* */}

          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>
              Old Password<span className='text-red-500'>*</span>
            </p>
            <div>
              <input
                {...register('oldPassword', {
                  required: 'Old Password is required',
                })}
                name='oldPassword'
                type='password'
                className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
              />
              {errors.oldPassword && (
                <p className='mt-1 text-xs text-red-400' role='alert'>
                  {errors.oldPassword?.message}
                </p>
              )}
            </div>
          </div>

          {/* new password  */}

          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>
              New Password<span className='text-red-500'>*</span>
            </p>

            <div>
              <Controller
                name='newPassword'
                defaultValue=''
                control={control}
                rules={{
                  required: 'New password is required',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                    message:
                      'Password must be 8+ characters and include at least one uppercase letter, one number, and one special character',
                  },
                }}
                render={({ field }) => (
                  <input
                    type='password'
                    id='newPassword'
                    className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
                    {...field}
                  />
                )}
              />

              {errors.newPassword && (
                <p
                  className='mt-1 text-xs text-red-400 lg:max-w-[200px]'
                  style={{ wordWrap: 'break-word' }}
                  role='alert'
                >
                  {errors.newPassword?.message}
                </p>
              )}
            </div>
          </div>

          {/* ************confirm password *************/}
          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>
              Confirm Password<span className='text-red-500'>*</span>
            </p>
            <div>
              <Controller
                name='confirmPassword'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value === newPassword || 'Passwords must match',
                }}
                render={({ field }) => (
                  <input
                    type='password'
                    id='confirmPassword'
                    className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
                    {...field}
                  />
                )}
              />

              {errors.confirmPassword && (
                <p className='mt-1 text-xs text-red-400' role='alert'>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}
          <div className='mt-5 justify-center lg:flex'>
            <button
              type='submit'
              className='rounded bg-main px-3 py-1.5 text-white'
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
