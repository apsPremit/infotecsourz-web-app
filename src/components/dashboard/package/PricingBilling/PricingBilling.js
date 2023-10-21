"use client"
import React, { useContext, useState } from 'react';

import { FaFire } from 'react-icons/fa';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';

const PricingBilling = () => {
    const { uploadedImages, perPhotoCost, photoType, imageQuantityFromUrl, taxRate, selectedPackage, updatedCredit } = useContext(StateContext)
    const [isAgree, setAgree] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const { user, userData } = UserAuth()


    let totalPhotos = uploadedImages.length < 1 ? imageQuantityFromUrl : uploadedImages.length
    let subtotal;
    let taxTotal;
    let grandTotal;
    let remainingCredit;


    if (selectedPackage.package_name == 'Pay as go') {
        subtotal = totalPhotos * perPhotoCost;
        taxTotal = (taxRate / 100) * subtotal
        grandTotal = subtotal + taxTotal;
        remainingCredit = userData?.remainingCredit
    } else if (selectedPackage.package_name == 'Free Trial') {
        subtotal = 0
        taxTotal = 0
        grandTotal = 0;
        remainingCredit = userData?.remainingCredit - totalPhotos
    } else {
        subtotal = selectedPackage?.price
        taxTotal = (taxRate / 100) * selectedPackage?.price
        grandTotal = subtotal + taxTotal;
        remainingCredit = updatedCredit - totalPhotos
    }


    let billProperties;

    if (selectedPackage.package_name == 'Pay as go') {
        billProperties = [
            { title: 'Total Photos', value: totalPhotos },
            { title: 'Price per product', value: "$" + parseFloat(perPhotoCost).toFixed(2) },
            { title: 'subTotal', value: "$" + parseFloat(subtotal).toFixed(2) },
            { title: 'Tax', value: "$" + parseFloat(taxTotal).toFixed(2) },
            { title: 'Grand Total', value: "$" + parseFloat(grandTotal).toFixed(2) },

        ]
    } else if (selectedPackage.package_name == 'Free Trial') {
        billProperties = [
            { title: 'Total Photos', value: totalPhotos },
            { title: 'Package', value: selectedPackage?.package_name },
            { title: 'Remaining Credit', value: 0 },
            { title: 'Subtotal', value: "$" + subtotal },
            { title: 'Tax', value: "$" + taxTotal },
            { title: 'GrandTotal', value: "$" + grandTotal },

        ]
    }
    else {
        billProperties = [

            { title: 'Package Name', value: selectedPackage?.package_name },
            { title: 'Total Credit', value: remainingCredit },
            { title: 'Package Price', value: 10 },
            { title: 'Subtotal', value: "$" + subtotal },
            { title: 'Tax', value: "$" + taxTotal },
            { title: 'GrandTotal', value: "$" + grandTotal },

        ]
    }


    const confirmOrder = () => {
        console.log('confirm')
    }



    return (
        <div className='bg-white rounded p-5 lg:p-10 mx-auto mt-10 w-full lg:w-1/2 '>
            <h3 className='font-bold text-xl mb-5'>Order  Summary</h3>
            {/* <div className='flex items-center space-x-3'>
                <span className='bg-pink-300 p-2 rounded text-red-800 text-xl'><FaFire /></span>
                <h3 className='font-bold '>Hot Rate</h3>
            </div> */}


            {/* properties  */}
            <div className='my-5'>
                {
                    billProperties.map((property, index) => <div
                        className='my-3'
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
                    <h3 className='text-xl font-bold'><span className='mr-1'>$</span> {grandTotal.toFixed(2)} <span>USD</span></h3>
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
        </div>
    );
};

export default PricingBilling;