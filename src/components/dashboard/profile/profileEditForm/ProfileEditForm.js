'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import defaultProfileImage from '../../../../../public/images/others/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from '@/redux/services/userApi';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '@/redux/features/profileImageSlice';
import Loader from '@/components/shared/Loader/Loader';
import { ImSpinner3 } from 'react-icons/im';

const ProfileEditForm = () => {
  const { userData } = useAuth();
  const img = useSelector((state) => state.profileImage?.img);
  const dispatch = useDispatch();
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const { name, email, country, phone } = userData || {};
  const imgSrc = img
    ? `${img}?t=${new Date().getTime()}`
    : userData?.photo || defaultProfileImage;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const updateProfilePhoto = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profile-image', file);

    try {
      const response = await updateProfileImage({
        userId: userData?.id,
        data: formData,
      }).unwrap();
      const url = response?.data?.url;
      dispatch(setProfileImage(url));
      toast.success('profile image updated');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const updateData = {
      name: data?.name || name,
      email: email,
      country: data?.country || country,
      phone: data?.phone || phone,
    };

    try {
      await updateProfile({ userId: userData?.id, data: updateData }).unwrap();
      toast.success('profile updated');
    } catch (error) {
      toast.error(error?.data?.message || 'something went wrong');
    }
  };

  return (
    <div>
      <div className='rounded bg-white p-5 '>
        <h3 className='mb-5  text-xl'>Basic Information</h3>

        <div className='my-5  flex justify-center '>
          <div className='relative overflow-hidden'>
            <label
              htmlFor='changeProfileImage'
              className='w-full cursor-pointer bg-red-300 relative'
            >
              <Image
                src={imgSrc}
                height={200}
                width={200}
                alt='profile photo'
                className='rounded-2xl border'
                style={{ height: '200px' }}
              />

              <input
                disabled={isLoading}
                onChange={updateProfilePhoto}
                name='photo'
                id='changeProfileImage'
                type='file'
                className='hidden'
              />

              <div className='absolute  top-1/2 h-1/2 w-[200px] rounded-2xl bg-[#8a7474] text-center text-white'>
                <span className='flex justify-center py-1 text-center text-2xl'>
                  {isLoading ? (
                    <ImSpinner3 className='animate-spin' />
                  ) : (
                    <AiOutlineCamera className='' />
                  )}
                </span>
                <p className='px-3 text-center text-sm'>
                  Upload a new Profile Picture
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* update  information  */}
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5 rounded bg-white p-5'>
          <h3 className='mb-5  text-xl'>Contact Information</h3>
          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>Name</p>
            <input
              defaultValue={name}
              {...register('name')}
              name='name'
              type='text'
              className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
            />
          </div>

          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>Email Address</p>
            <input
              readOnly
              disabled
              defaultValue={email}
              {...register('email')}
              name='email'
              type='email'
              className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
            />
          </div>

          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>Country</p>
            <input
              defaultValue={country}
              {...register('country')}
              name='country'
              type='text'
              className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
            />
          </div>

          <div className='my-3 justify-between lg:flex '>
            <p className='text-main'>Phone</p>
            <input
              defaultValue={phone}
              {...register('phone')}
              name='phone'
              type='text'
              className='w-full rounded border border-shadow px-3 py-1.5 outline-0 focus:border-main lg:w-auto'
            />
          </div>

          <div className='mt-10 justify-center lg:flex'>
            <button
              type='submit'
              className='rounded bg-main px-3 py-1.5 text-white'
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <PasswordChangeForm />
      <Toaster />
    </div>
  );
};

export default ProfileEditForm;
