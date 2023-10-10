"use client"
import React, { useContext } from 'react';
import BillingProcess from '../BillingProcess/BillingProcess';
import { FaFire } from 'react-icons/fa';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';

const BillingRightSide = () => {
    const { uploadedImages, perPhotoCost, photoType, imageQuantityFromUrl, taxRate, selectedPackage, updatedCredit } = useContext(StateContext)

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
            { title: 'Total Photos', value: totalPhotos },
            { title: 'Package', value: selectedPackage?.package_name },
            { title: 'Remaining Credit', value: remainingCredit },
            { title: 'Subtotal', value: "$" + subtotal },
            { title: 'Tax', value: "$" + taxTotal },
            { title: 'GrandTotal', value: "$" + grandTotal },

        ]
    }






    return (
        <div className='bg-white rounded p-5 '>
            <h3 className='font-bold text-xl mb-5'> Summary</h3>
            <div className='flex items-center space-x-3'>
                <span className='bg-pink-300 p-2 rounded text-red-800 text-xl'><FaFire /></span>
                <h3 className='font-bold '>Hot Rate</h3>
            </div>


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
            <BillingProcess
                subtotal={subtotal}
                taxTotal={taxTotal}
                perPhotoCost={perPhotoCost}
                grandTotal={grandTotal}
                remainingCredit={remainingCredit}
            />

        </div>
    );
};

export default BillingRightSide;