"use client"
import Modal from '@/components/shared/Modal/Modal';
import { UserAuth } from '@/context/AuthProvider';
import StateProvider, { StateContext } from '@/context/StateProvider';
import saveOrder from '@/utils/functions/saveOrder';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const BillingProcess = ({ subTotal, perPhotoCost, grandTotal, taxTotal, remainingCredit, totalPhotos }) => {

    const router = useRouter()
    const [isAgree, setAgree] = useState(false)
    const [isProcessing, setProcessing] = useState(false)


    const {
        uploadedImages,
        photoType,
        selectedPackage,
        orderId,
        productDetailsDescription,
        fileUrl,
        photoRequirements,
        orderName,
        taxRate,
        returnTime,
        hasInstructions

    } = useContext(StateContext)


    const { user, userData } = UserAuth()







    const confirmOrder = async () => {

        // if (totalPhotos > userData?.remainingCredit) {
        //     return toast((ts) => (
        //         <div className='flex items-start'>
        //             <div className='flex-1 mr-2'>
        //                 <span className='block'>You Have not require credit</span>
        //                 <Link className='underline text-main' href='/dashboard/pricing'>Go To Pricing</Link>
        //             </div>
        //             <button className=' w-8 h-8 bg-red-400 text-white rounded-full text-xs' onClick={() => toast.dismiss(ts.id)}>
        //                 x
        //             </button>
        //         </div>
        //     ));
        // }


        setProcessing(true)
        const orderDetails = {
            orderId: orderId,
            orderName: orderName,
            name: user?.displayName,
            email: user?.email,
            photoType,
            package: selectedPackage?.package_name,
            photoQuantity: parseInt(totalPhotos),
            perPhotoCost,
            subTotal,
            taxRate,
            taxTotal,
            grandTotal,
            remainingCredit,
            productDetailsDescription,
            fileUrl,
            photoRequirements,
            returnTime,
            address: userData.address,
            hasInstructions: hasInstructions
        }


        try {
            const result = await saveOrder(orderDetails)

            if (result.success) {
                toast.success('order success')
                setProcessing(false)
                router.push(`/order_success?orderId=${result?.data?.orderId}`)
                // router.reload()
            }
        } catch (error) {

            toast.error(error?.response?.data?.message || 'order not acceptable')
            setProcessing(false)
        }


    }

    return (
        <div>

            <button disabled={!isAgree || isProcessing} onClick={confirmOrder} className='w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer'>{isProcessing ? "Processing..." : "Confirm Order"}</button>



            {/* terms and conditions */}
            <label htmlFor="agree_terms" className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'>
                <input onChange={() => setAgree(!isAgree)} id='agree_terms' checked={isAgree} type="checkbox" className='scale-150 mt-2' />
                <p className='text-justify text-sm'>I have read and accept Stratis Privacy Policy, including that Stratis may email and SMS me about the services it provides. By providing a contact number, I invite Stratis or its Trusted Partners to call me during the call centre opening hours to discuss the potential purchase of a car insurance policy.
                </p>
            </label>
            {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <Toaster />
        </div>
    );
};

export default BillingProcess;