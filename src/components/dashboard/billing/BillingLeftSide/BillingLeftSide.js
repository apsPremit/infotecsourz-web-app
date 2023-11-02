"use client"
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import paymentMethods from '../../../../../public/images/others/payment_methods.png'
import bank_transfer from '../../../../../public/images/others/bank_transfer.png'

const BillingLeftSide = () => {
    const { user } = UserAuth()
    const { setBillingMessage, paymentMethod, setPaymentMethod } = useContext(StateContext)


    return (
        <div className='bg-white p-5 rounded'>
            <h3 className='font-bold text-xl mb-3'>You’re almost there! Complete your order</h3>
            <h3 className='mt-5 mb-2'>Select Payment method</h3>


            <div className=''>
                <label htmlFor='paypal_credit' className='border px-3 py-2 rounded grid grid-cols-2 items-center courser-pointer mb-5'>
                    <div className='flex items-center gap-2 font-bold'>
                        <input
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            value='paypal / credit card'
                            id='paypal_credit'
                            type="radio"
                            className='accent-main w-4 h-4'
                            checked={paymentMethod === 'paypal / credit card'}
                        />
                        <p className='whitespace-nowrap'>Paypal / Credit Card</p>
                    </div>
                    <Image
                        alt='payment methods'
                        src={paymentMethods}
                        width={200}
                    />
                </label>
                <label htmlFor='bank_transfer' className='border px-3 py-2 rounded grid grid-cols-2 items-center courser-pointer'>
                    <div className='flex items-center  gap-2 font-bold'>
                        <input
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            value='bank transfer'
                            id='bank_transfer'
                            type="radio"
                            className='accent-main w-4 h-4'
                            checked={paymentMethod === 'bank transfer'}
                        />
                        <p className='whitespace-nowrap'>Bank Transfer</p>
                    </div>
                    <Image
                        alt='payment methods'
                        src={bank_transfer}
                        height={45}
                    />
                </label>
            </div>

        </div>
    );
};

export default BillingLeftSide;