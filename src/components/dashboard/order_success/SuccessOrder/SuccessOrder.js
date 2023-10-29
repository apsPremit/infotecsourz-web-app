"use client"
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SuccessOrder = () => {
    const search = useSearchParams()
    const orderId = search.get('orderId')

    const handleNavigate = () => {

        window.location.reload()
        window.location.href = "/dashboard";

    }

    return (
        <div className='border border-shadow  shadow-lg  rounded lg:w-2/5 '>
            <div className='  bg-white p-10 rounded'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-5xl text-green-500 text-center mx-auto mb-5'>{<IoIosCheckmarkCircleOutline className='text-center' />}</h1>
                    <h1 className='text-lg'> #{orderId} </h1>
                    <h1 className='text-xl lg:text-2xl font-bold mb-5'>Order Placed successful!</h1>
                    <p>Thank You</p>
                    <button onClick={handleNavigate} className='px-3 py-2.5 my-5 bg-main hover:bg-mainHover text-white rounded'>Go to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessOrder;