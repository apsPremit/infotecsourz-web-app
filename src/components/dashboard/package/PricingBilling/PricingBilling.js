"use client"
import React, { useContext, useState } from 'react';

import { FaFire } from 'react-icons/fa';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { packages } from '@/utils/json/packagePlan';
import { baseUrl } from '@/utils/functions/baseUrl';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import paymentMethods from '../../../../../public/images/others/payment_methods.png'
import bank_transfer from '../../../../../public/images/others/bank_transfer.png'
import Swal from 'sweetalert2';

const PricingBilling = () => {
    const params = useSearchParams()
    const { taxRate } = useContext(StateContext)
    const [isAgree, setAgree] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const { userData } = UserAuth()
    const [paymentMethod, setPaymentMethod] = useState(null)

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
        if (!paymentMethod) {
            return Swal.fire('please select payment method')
        }
        setProcessing(true)
        const randomNum = Math.floor(Math.random() * 100000000);
        const randomString = String(randomNum).padStart(8, '0');



        const orderDetails = {
            orderId: randomString,
            orderName: `subscription for ${package_name} package`,
            name: userData?.name,
            email: userData?.email,
            package: package_name,
            subTotal,
            taxRate,
            taxTotal,
            grandTotal,
            credit: photos,
            address: userData?.address || 'unavailable',
            paymentMethod,
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

            if (data?.success) {
                setProcessing(false)
                router.push(`/order_success?orderId=${orderDetails?.orderId}`)
            }
            setProcessing(false)
        } catch (error) {
            setProcessing(false)
            toast.error(error?.message || 'internal server error')
        }







    }



    return (
        <div className=' rounded p-5 lg:p-10  mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-5 '>


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

            {/* right side  */}
            <div className='bg-white p-10'>
                <h3 className='font-bold text-xl mb-5'>Summary</h3>

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

                {/* payment method  */}

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
                        <input onChange={() => setAgree(!isAgree)} id='agree_terms' checked={isAgree} type="checkbox" className='scale-125 mt-1' />
                        <p className='text-sm'>I accept <Link target='_blank' href='https://www.infotecsourz.com/terms-and-conditions/' className='text-main hover:underline'>Terms & Conditions</Link></p>
                    </label>
                </div>
            </div>



            <Toaster />
        </div >
    );
};

export default PricingBilling;