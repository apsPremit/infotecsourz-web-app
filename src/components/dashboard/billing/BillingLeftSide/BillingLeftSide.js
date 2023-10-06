"use client"
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import React, { useContext, useState } from 'react';


const BillingLeftSide = () => {
    const { user } = UserAuth()
    const { setBillingMessage } = useContext(StateContext)


    const fields = [
        { label: 'First Name', value: user?.displayName.split(' ')[0] || user?.displayName, type: 'text' },
        { label: 'Last Name', value: user?.displayName.split(' ')[1] || user?.displayName, type: 'text' },
        { label: 'Mobile Number', value: user?.phone || '', type: 'text' },
        { label: 'Email Address', value: user?.email, type: 'email' },


    ]




    return (
        <div className='bg-white p-5 rounded'>
            <div>
                <h3 className='font-bold text-xl mb-3'>Personal Details</h3>
                <p className=''>Enter your details and a we will proceed to assist you with your order.</p>
            </div>
            {/* input fields  */}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3'>
                {
                    fields.map((field, index) => <div
                        key={index}
                    >
                        <label>
                            <span className='text-[#9d9c9c] text-sm mb-4 ml-1'>{field?.label}</span>
                            <input
                                type={field?.type}
                                defaultValue={field?.value}
                                className='border border-shadow w-full px-3 py-1.5 rounded outline-0 focus:rounded focus:border-main disabled:cursor-not-allowed'
                                disabled={field?.value !== ''}
                            />
                        </label>
                    </div>)
                }

            </div>

            {/* message section  */}
            <div className='w-full my-10'>
                <label>
                    <span className='text-[#9d9c9c] text-sm mb-4 ml-1'>Message</span>
                    <textarea
                        name="" id=""
                        rows={5}
                        onBlur={(e) => setBillingMessage(e.target.value)}
                        className='border border-shadow outline-0 w-full px-5 py-3 focus:border-main focus:rounded'
                    ></textarea>
                </label>
            </div>

        </div>
    );
};

export default BillingLeftSide;