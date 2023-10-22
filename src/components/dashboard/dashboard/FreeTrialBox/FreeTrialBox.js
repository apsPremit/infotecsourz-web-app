"use client"
import React from 'react';

import { UserAuth } from '@/context/AuthProvider';
import { BsImageAlt } from 'react-icons/bs';

const FreeTrialBox = () => {
    const { userData } = UserAuth()
    return (
        <>
            {
                userData.subscribedPackage === 'free trial' &&
                <div className='border border-shadow p-5 rounded bg-white'>
                    <div className=''>
                        <p className='p-1.5 w-8 h-8 flex justify-center items-center bg-green-200 text-green-500 text-xl border border-red-20 rounded-full'>
                            <BsImageAlt className='' />
                        </p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-bold  text-lg'>$20</p>
                        <h3 className='text  text-[#9f9f9f] text-sm'>Get $20 for Free trial!</h3>

                        <button className='px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover disabled:cursor-not-allowed disable:bg-mainHover'>Free trial</button>
                    </div>
                </div>
            }
        </>
    );
};

export default FreeTrialBox;