"use client"
import { UserAuth } from '@/context/AuthProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const CheckUserAuth = () => {
    const { user, loading } = UserAuth()



    if (!user?.email) {
        redirect('/login')
    }
    redirect('/dashboard')
};

export default CheckUserAuth;