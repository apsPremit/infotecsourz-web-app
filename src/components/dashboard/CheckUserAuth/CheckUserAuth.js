"use client"
import { UserAuth } from '@/context/AuthProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const CheckUserAuth = () => {
    const { user } = UserAuth()
    if (!user?.email) {
        redirect('/dashboard')
    }
    redirect('/dashboard')
};

export default CheckUserAuth;