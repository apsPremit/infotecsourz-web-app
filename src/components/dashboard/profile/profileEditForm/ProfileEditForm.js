"use client"
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCamera } from "react-icons/ai";
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { UserAuth } from '@/context/AuthProvider';
import defaultProfileImage from '../../../../../public/images/others/profile.png'
import updateProfile from '@/utils/functions/updateProfile';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import { StateContext } from '@/context/StateProvider';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';


const ProfileEditForm = () => {
    const { userData, setUserData } = UserAuth()
    const [photoUploading, setPhotoUploading] = useState(false)


    const { name, email, address, phone } = userData || {}


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const updateProfilePhoto = async (e) => {
        const loadingToast = toast.loading('uploading image...')
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('photo', file)

        try {
            const res = await axios.put(`${baseUrl}/user/update_profile_image/${userData.email}`, formData)
            const data = res?.data;
            if (data?.error) {
                toast.error('something wrong')
            }
            setUserData(data?.user)
            toast.dismiss(loadingToast)
            toast.remove(loadingToast)


        } catch (error) {
            console.log(error)
            toast.error('something wrong')
            toast.dismiss(loadingToast)
            toast.remove(loadingToast)
        }


    }


    const onSubmit = async (data) => {
        const updateData = {
            name: data?.name || userData?.name,
            email: userData?.email,
            phone: data?.phone || phone,
            address: data?.address || address
        }


        try {
            const updatedData = await updateProfile(email || userData?.email, updateData)
            console.log('updated', updatedData)
            if (updatedData) {
                setUserData(updatedData?.data)
                toast.success('your profile update successful')
            }
        } catch (error) {
            toast.error('something wrong')
        }


    }






    return (
        <div>
            <div className='p-5 bg-white rounded '>
                <h3 className='text-xl  mb-5'>Basic Information</h3>

                <div className='flex  justify-center my-5 '>
                    <div className='relative overflow-hidden'>
                        <label htmlFor='changeProfileImage' className='bg-red-300 w-full cursor-pointer '>
                            <Image
                                src={userData?.image || defaultProfileImage}
                                height={200}
                                width={200}
                                alt='profile photo'
                                className='rounded-2xl border'
                                style={{ height: '200px', }}
                            />

                            <input
                                onChange={updateProfilePhoto}
                                name='photo'
                                id='changeProfileImage'
                                type="file"
                                className='hidden'
                            />

                            <div className='absolute  text-white w-[200px] h-1/2 top-1/2 text-center rounded-2xl bg-[#8a7474]'>
                                <span className='text-center text-2xl flex justify-center py-1'><AiOutlineCamera className='' /></span>
                                <p className='text-center text-sm px-3'>Upload a new Profile Picture</p>
                            </div>

                        </label>

                    </div>
                </div>
            </div>


            {/* update  information  */}
            <form action="" onSubmit={handleSubmit(onSubmit)}>

                <div className='bg-white p-5 rounded mb-5'>
                    <h3 className='text-xl  mb-5'>Contact Information</h3>
                    <div className='lg:flex justify-between my-3 '>
                        <p className='text-main'>Name</p>
                        <input
                            defaultValue={name} {...register("name")}
                            name='name'
                            type="text"
                            className='border border-shadow px-3 py-1.5 rounded outline-0 focus:border-main w-full lg:w-auto'
                        />
                    </div>

                    <div className='lg:flex justify-between my-3 '>
                        <p className='text-main'>Email Address</p>
                        <input
                            readOnly
                            disabled
                            defaultValue={email} {...register("email")}
                            name='email'
                            type="email"
                            className='border border-shadow px-3 py-1.5 rounded outline-0 focus:border-main w-full lg:w-auto'
                        />
                    </div>

                    <div className='lg:flex justify-between my-3 '>
                        <p className='text-main'>Phone Number</p>
                        <input
                            defaultValue={phone} {...register("phone")}
                            name='phone'
                            type="tel"
                            className='border border-shadow px-3 py-1.5 rounded outline-0 focus:border-main w-full lg:w-auto'
                        />
                    </div>

                    <div className='lg:flex justify-between my-3 '>
                        <p className='text-main'>Address</p>
                        <input
                            defaultValue={address} {...register("address")}
                            name='address'
                            type="text"
                            className='border border-shadow px-3 py-1.5 rounded outline-0 focus:border-main w-full lg:w-auto'
                        />
                    </div>


                    <div className='lg:flex justify-center mt-10'>
                        <button type='submit' className='px-3 py-1.5 bg-main text-white rounded'>Update</button>
                    </div>
                </div>

            </form>
            <PasswordChangeForm />
            <Toaster />
        </div>

    );
};

export default ProfileEditForm;