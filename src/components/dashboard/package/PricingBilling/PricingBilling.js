"use client"
import React, { useContext, useState } from 'react';

import { FaFire } from 'react-icons/fa';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { packages } from '@/utils/json/packagePlan';
import { baseUrl } from '@/utils/functions/baseUrl';
import toast, { Toaster } from 'react-hot-toast';

const PricingBilling = () => {
    const params = useSearchParams()
    const { taxRate } = useContext(StateContext)
    const [isAgree, setAgree] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const { user, userData } = UserAuth()
    console.log("userData", userData)
    const router = useRouter()
    const searchPackage = params.get('package')
    const packageInfo = packages.find(pk => pk.package_name === searchPackage)
    const { package_name, price, photos } = packageInfo || {}

    let subTotal = price
    let taxTotal = price / 100 * taxRate;
    let grandTotal = subTotal + taxTotal



    let billProperties = [

        { title: 'Package Name', value: package_name },
        { title: 'Package Credit', value: photos },
        { title: 'Package Price', value: "$" + price },
        { title: 'Subtotal', value: "$" + subTotal },
        { title: 'Tax', value: "$" + taxTotal },
        { title: 'GrandTotal', value: "$" + grandTotal },

    ]


    const confirmOrder = async () => {
        setProcessing(true)
        const randomNum = Math.floor(Math.random() * 100000000);
        const randomString = String(randomNum).padStart(8, '0');



        const orderDetails = {
            orderId: randomString,
            orderName: `subscription for ${package_name} package`,
            name: user?.displayName,
            email: user?.email,
            package: package_name,
            subTotal,
            taxRate,
            taxTotal,
            grandTotal,
            credit: photos,
            address: userData?.address || 'unavailable'
        }


        try {
            const res = await fetch(`${baseUrl}/subscription`, {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(orderDetails)
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setProcessing(false)
                router.push(`/order_success?orderId=${orderDetails?.orderId}`)
            }
        } catch (error) {
            setProcessing(false)
            console.log(error)
            toast.error(error?.message || 'internal server error')
        }







    }



    return (
        <div className='bg-white rounded p-5 lg:p-10 mx-auto mt-10 w-full lg:w-1/2 '>
            <h3 className='font-bold text-xl mb-5'>Order  Summary</h3>
            {/* <div className='flex items-center space-x-3'>
                <span className='bg-pink-300 p-2 rounded text-red-800 text-xl'><FaFire /></span>
                <h3 className='font-bold '>Hot Rate</h3>
            </div> */}


            {/* properties  */}
            <div className='my-5 '>
                {
                    billProperties.map((property, index) => <div
                        className='my-3 '
                        key={index}
                    >
                        <div className='flex justify-between items-center '>
                            <h3 className='text-[#ADACB0]'>{property?.title}</h3>
                            <h3>{property?.value}</h3>
                        </div>
                    </div>)
                }
            </div>
            <hr />

            {/* price section  */}

            <div className='flex items-center space-x-3 my-7'>
                <div>
                    <p className='px-5 py-2.5 border rounded text-2xl '>$</p>
                </div>
                <div>
                    <h3 className='text-xl font-bold'><span className='mr-1'>$</span> {grandTotal?.toFixed(2)} <span>USD</span></h3>
                    <p className='text-neutral'>Cost</p>
                </div>
            </div>

            {/* billing btn and process  */}
            <div>
                <button disabled={!isAgree || isProcessing} onClick={confirmOrder} className='w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer'>{isProcessing ? "Processing..." : "Confirm Order"}</button>
                <label htmlFor="agree_terms" className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'>
                    <input onChange={() => setAgree(!isAgree)} id='agree_terms' checked={isAgree} type="checkbox" className='scale-150 mt-2' />
                    <p className='text-justify text-sm'>I have read and accept Stratis Privacy Policy, including that Stratis may email and SMS me about the services it provides. By providing a contact number, I invite Stratis or its Trusted Partners to call me during the call centre opening hours to discuss the potential purchase of a car insurance policy.
                    </p>
                </label>
            </div>
            <Toaster />
        </div>
    );
};

export default PricingBilling;