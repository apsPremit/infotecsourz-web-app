"use client"
import { UserAuth } from '@/context/AuthProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const CheckUserAuth = () => {
    const { user } = UserAuth()
    console.log(user)
    console.log('call check auth', user)
    if (!user?.email) {
        redirect('/login')
    }
    redirect('/dashboard')
};

export default CheckUserAuth;