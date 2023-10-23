"use client"
import { getPlan } from '@/utils/functions/getPlan';
import React, { useContext } from 'react';
import { packages } from '@/utils/json/packagePlan';
import SinglePackage from '@/components/dashboard/package/SinglePackage/SinglePackage';
import Link from 'next/link';
import StateProvider, { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';
import { redirect, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const Plan = () => {
    const { selectedPackage } = useContext(StateContext)

    const { userData } = UserAuth()
    const router = useRouter()
    const handleProceed = () => {


        if ((selectedPackage?.package_name == 'pay as go') || (selectedPackage.package_name == userData?.subscribedPackage)) {
            router.push('/dashboard/billing')
        }
        else {
            toast((t) => (
                <div className='flex items-start'>
                    <div className='flex-1'>
                        <span className='block'>Please Upgrade your plan or choose Pay as Go</span>
                        <Link className='underline text-main' href='/dashboard/pricing'>Go To Pricing</Link>
                    </div>
                    <button className=' w-8 h-8 bg-red-400 text-white rounded-full text-xs' onClick={() => toast.dismiss(t.id)}>
                        x
                    </button>
                </div>
            ));
        }

    }

    return (
        <div>
            <h1 className='text-3xl mt-5 mb-10 font-bold text-center'>Choose Your Plan</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10'>
                {
                    packages.map(plan => <SinglePackage
                        key={plan.id}
                        plan={plan} />)
                }
            </div>
            <div className='flex  justify-center mt-10 mb-5'>

                <button onClick={handleProceed} className='text-white px-3.5 py-2 bg-main hover:bg-mainHover rounded flex '>Proceed
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default Plan; 