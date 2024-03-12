'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import defaultProfileImage from '../../../../../public/images/others/profile.png';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import { StateContext } from '@/context/StateProvider';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { photoUrl, setPhotoUrl } = useContext(StateContext);
  const session = useSession();
  const user = session?.data?.user;

  const { name, email, image, country, company } = user || {};

  return (
    <div className='lg:px-10 '>
      <div className='mb-5 space-x-5 rounded bg-white p-5 md:flex '>
        <Image
          src={image || defaultProfileImage}
          height={150}
          width={150}
          alt='profile photo'
          className='mb-3 h-[250px] w-full   rounded  border md:w-auto lg:h-[150px]'
          style={{ maxWidth: '150px', objectFit: 'fill' }}
        />
        <div className=''>
          <h3 className='mb-1 text-3xl'>{name}</h3>
          <p className='mb-1 ml-1 font-bold text-main'>{email}</p>
          {country && (
            <div className='mb-3 flex items-center'>
              <span className='mr-2 font-bold text-main'>
                <IoLocationOutline size={20} />
              </span>
              <p>{country}</p>
            </div>
          )}

          <div>
            <Link href='/dashboard/profile/edit'>
              <button className='rounded border border-shadow px-3 py-1.5'>
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* basic informatin  */}
      <div className='mb-5 rounded bg-white p-5'>
        <h3 className='mb-5  text-xl'>Contact Information</h3>

        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Name</p>
          <p>{name}</p>
        </div>
        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Email Address</p>
          <p>{email}</p>
        </div>

        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Country</p>
          <p>{country}</p>
        </div>
        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Company Name</p>
          <p>{company}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
