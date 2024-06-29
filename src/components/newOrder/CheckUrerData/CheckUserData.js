'use client';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CheckUserData = () => {
  const router = useRouter();
  const phone = false;
  if (!phone) {
    toast('please fill up your information first');
    // redirect('/dashboard/profile')
    return (
      <span>
        {' '}
        <Toaster />
      </span>
    );
  }
};

export default CheckUserData;
