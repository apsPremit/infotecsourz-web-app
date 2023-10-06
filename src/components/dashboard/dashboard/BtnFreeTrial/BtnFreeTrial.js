"use client"
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const BtnFreeTrial = () => {
    const { setSelectedPackage, selectedPackage } = useContext(StateContext)
    const { userData } = UserAuth()
    const router = useRouter()

    const handleFreeTrial = () => {
        setSelectedPackage({ package_name: 'Free Trial' })

        router.push('/dashboard/new_order')

    }

    return (
        <button disabled={userData?.subscribedPackage !== 'Free Trial'} onClick={handleFreeTrial} className='px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover disabled:cursor-not-allowed disable:bg-mainHover'>Free trial</button>
    );
};

export default BtnFreeTrial;