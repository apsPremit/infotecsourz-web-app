'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import defaultProfileImage from '../../../../../public/images/others/profile.png';
import updateProfile from '@/utils/functions/updateProfile';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import { StateContext } from '@/context/StateProvider';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import { useSession } from 'next-auth/react';

const ProfileEditForm = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [photoUploading, setPhotoUploading] = useState(false);

  const { name, email, country, company } = user || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const updateProfilePhoto = async (e) => {
    const loadingToast = toast.loading('uploading image...');
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await axios.put(
        `${baseUrl}/user/update_profile_image/${user.email}`,
        formData
      );
      const data = res?.data;
      if (data?.error) {
        toast.error('something wrong');
      }
      toast.dismiss(loadingToast);
      toast.remove(loadingToast);
    } catch (error) {
      console.log(error);
      toast.error('something wrong');
      toast.dismiss(loadingToast);
      toast.remove(loadingToast);
    }
  };

  const onSubmit = async (data) => {
    const updateData = {
      name: data?.name || name,
      email: email,
      country: data?.country || country,
      company: data?.company || company,
    };

    try {
      const updatedData = await updateProfile(email || user?.email, updateData);

      if (updatedData) {
        toast.success('your profile update successful');
      }
    } catch (error) {
      toast.error('something wrong');
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
              className='w-full cursor-pointer bg-red-300 '
            >
              <Image
                src={user?.image || defaultProfileImage}
                height={200}
                width={200}
                alt='profile photo'
                className='rounded-2xl border'
                style={{ height: '200px' }}
              />

              <input
                onChange={updateProfilePhoto}
                name='photo'
                id='changeProfileImage'
                type='file'
                className='hidden'
              />

              <div className='absolute  top-1/2 h-1/2 w-[200px] rounded-2xl bg-[#8a7474] text-center text-white'>
                <span className='flex justify-center py-1 text-center text-2xl'>
                  <AiOutlineCamera className='' />
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
            <p className='text-main'>Company</p>
            <input
              defaultValue={company}
              {...register('company')}
              name='company'
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
