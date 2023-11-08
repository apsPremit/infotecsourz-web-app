"use client"
import LogOutBtn from '@/components/shared/LogOutBtn/LogOutBtn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import defaultProfileImage from '../../../../../public/images/others/profile.png'
import { UserAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import { StateContext } from '@/context/StateProvider';
import { useSession } from 'next-auth/react';


const ProfilePage = () => {
    const { photoUrl, setPhotoUrl } = useContext(StateContext)
    const { userData } = UserAuth()

    const { name, email, image, phone, address } = userData || {}

    return (
        <div className='lg:px-10 '>

            <div className='md:flex space-x-5 p-5 bg-white rounded mb-5 '>
                <Image
                    src={image || defaultProfileImage}
                    height={150}
                    width={150}
                    alt='profile photo'
                    className='border w-full h-[250px]   lg:h-[150px]  md:w-auto mb-3'
                    style={{ maxWidth: '150px', objectFit: 'contain' }}

                />
                <div className=''>
                    <h3 className='text-3xl mb-1'>{name}</h3>
                    <p className='mb-1 text-main font-bold ml-1'>{email}</p>
                    <div className='flex items-center mb-3'>
                        <span className='text-main font-bold mr-2'><IoLocationOutline size={20} /></span>
                        <p>{address}</p>
                    </div>

                    <div>
                        <Link href='/dashboard/profile/edit'>
                            <button className='px-3 py-1.5 rounded border border-shadow'>Edit Profile</button>
                        </Link>
                        {/* <LogOutBtn /> */}
                    </div>
                </div>
            </div>

            {/* basic informatin  */}
            <div className='p-5 bg-white rounded mb-5'>
                <h3 className='text-xl  mb-5'>Contact Information</h3>

                <div className='md:flex justify-between mb-2'>
                    <p className='text-main'>Name</p>
                    <p>{name}</p>
                </div>
                <div className='md:flex justify-between mb-2'>
                    <p className='text-main'>Email Address</p>
                    <p>{email}</p>
                </div>
                <div className='md:flex justify-between mb-2'>
                    <p className='text-main'>Phone Number</p>
                    <p>{phone}</p>
                </div>
                <div className='md:flex justify-between mb-2'>
                    <p className='text-main'>Address</p>
                    <p>{address}</p>
                </div>


            </div>



        </div>
    );
};

export default ProfilePage;