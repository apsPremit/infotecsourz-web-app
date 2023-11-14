"use client"
import Modal from '@/components/shared/Modal/Modal';
import { UserAuth } from '@/context/AuthProvider';
import StateProvider, { StateContext } from '@/context/StateProvider';
import saveOrder from '@/utils/functions/saveOrder';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const BillingProcess = ({ subTotal, perPhotoCost, grandTotal, taxTotal, remainingCredit, totalPhotos }) => {

    const router = useRouter()
    const [isAgree, setAgree] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const { userData } = UserAuth()

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
        hasInstructions,
        paymentMethod,

    } = useContext(StateContext)


    const confirmOrder = async () => {
        if (!paymentMethod) {
            return Swal.fire('please select payment method')
        }

        setProcessing(true)
        const orderDetails = {
            orderId: orderId,
            orderName: orderName,
            name: userData?.name,
            email: userData?.email,
            country: userData.country,
            photoType,
            package: selectedPackage?.package_name || userData?.subscribedPackage,
            photoQuantity: parseInt(totalPhotos),
            perPhotoCost,
            subTotal,
            taxRate,
            taxTotal,
            grandTotal,
            productDetailsDescription,
            fileUrl,
            photoRequirements,
            returnTime,
            hasInstructions: hasInstructions,
            paymentMethod
        }


        try {
            const result = await saveOrder(orderDetails)

            if (result?.error) {
                Swal.fire({
                    icon: 'warning',
                    html: `<p>${error?.response?.data?.error || 'order not acceptable'}</p>`
                })
            }

            Swal.fire({
                icon: 'success',
                text: "Order success"
            })
            setProcessing(false)
            router.push(`/order_success?orderId=${orderId}`)
            // router.reload()


        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'warning',
                html: `<p>${error?.response?.data?.error || 'order not acceptable'}</p>`
            })
            setProcessing(false)
        }


    }

    return (
        <div>

            <button disabled={!isAgree || isProcessing} onClick={confirmOrder} className='w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer'>{isProcessing ? "Processing..." : "Confirm Order"}</button>



            {/* terms and conditions */}
            <label htmlFor="agree_terms" className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'>
                <input onChange={() => setAgree(!isAgree)} id='agree_terms' checked={isAgree} type="checkbox" className='scale-125 mt-1' />
                <p className='text-sm'>I accept <Link target='_blank' href='https://www.infotecsourz.com/terms-and-conditions/' className='text-main hover:underline'>Terms & Conditions</Link></p>
            </label>
            {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <Toaster />
        </div>
    );
};

export default BillingProcess;