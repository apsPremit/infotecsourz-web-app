"use client"
import { UserAuth } from '@/context/AuthProvider';
import React from 'react';

const SubscribedPackage = () => {
    const { userData } = UserAuth()


    return (
        <div className='grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 mb-5 text-white  '>
            <div className='mt-3 bg-blue-500 px-5 pt-2 pb-5 rounded-lg shadow'>
                <p className='text-sm font-bold'>Subscribed Package</p>
                <p className='text-lg font-bold my-1'>{userData?.subscribedPackage}</p>
                <p className='text-sm'>Remaining Credit: <span className='font-bold'>{userData?.remainingCredit}</span></p>
            </div>
        </div>
    );
};

export default SubscribedPackage;