"use client"
import LogOutBtn from '@/components/shared/LogOutBtn/LogOutBtn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import profileImage from '../../../../../public/images/others/profile.png'
import { UserAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';

const ProfilePage = () => {

    const { user, userData } = UserAuth()

    const { name, email, imageUrl, phone, companyName, address } = userData || {}



    return (
        <div className='lg:px-10'>

            <div className='flex space-x-5 p-5 bg-white rounded mb-5'>
                <Image
                    src={imageUrl || profileImage}
                    height={150}
                    width={150}
                    alt='profile photo'
                />
                <div>
                    <h3 className='text-3xl mb-1'>{name || user?.displayName || 'Unknown'}</h3>
                    <p className='mb-1 text-main font-bold ml-1'>{email || user?.email}</p>
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

                <div className='flex justify-between mb-2'>
                    <p className='text-main'>Name</p>
                    <p>{name || user?.displayName || "Unknown"}</p>
                </div>
                <div className='flex justify-between mb-2'>
                    <p className='text-main'>Email Address</p>
                    <p>{email || user?.email}</p>
                </div>
                <div className='flex justify-between mb-2'>
                    <p className='text-main'>Phone Number</p>
                    <p>{phone}</p>
                </div>
                <div className='flex justify-between mb-2'>
                    <p className='text-main'>Address</p>
                    <p>{address}</p>
                </div>
                <div className='flex justify-between mb-2'>
                    <p className='text-main'>Company Name</p>
                    <p>{companyName}</p>
                </div>


            </div>



        </div>
    );
};

export default ProfilePage;