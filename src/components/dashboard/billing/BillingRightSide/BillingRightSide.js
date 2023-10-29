"use client"
import React, { useContext } from 'react';
import BillingProcess from '../BillingProcess/BillingProcess';
import { FaFire } from 'react-icons/fa';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';

const BillingRightSide = () => {
    const { uploadedImages, perPhotoCost, photoType, imageQuantityFromUrl, taxRate, selectedPackage, updatedCredit } = useContext(StateContext)

    const { userData } = UserAuth()


    let totalPhotos = uploadedImages.length < 1 ? imageQuantityFromUrl : uploadedImages.length
    let subTotal = totalPhotos * perPhotoCost;
    let taxTotal = (taxRate / 100) * subTotal
    let grandTotal = subTotal + taxTotal;
    let remainingCredit = userData?.remainingCredit - totalPhotos;


    if (selectedPackage.package_name == 'pay as go') {
        remainingCredit = userData?.remainingCredit;

    } else if (selectedPackage.package_name == 'free trial') {
        remainingCredit = 0
    }


    let billProperties = [
        { title: 'Total Photos', value: totalPhotos },
        { title: 'Package', value: selectedPackage.package_name || userData?.subscribedPackage },
        { title: 'Price per product', value: "$" + parseFloat(perPhotoCost).toFixed(2) },
        { title: 'Remaining Credit', value: remainingCredit },
        { title: 'subtotal', value: "$" + parseFloat(subTotal).toFixed(2) },
        { title: 'Tax', value: "$" + parseFloat(taxTotal).toFixed(2) },
        { title: 'Grand Total', value: "$" + parseFloat(grandTotal).toFixed(2) },
    ]

    // } else if (selectedPackage.package_name == 'free trial') {
    //     billProperties = [
    //         { title: 'Total Photos', value: totalPhotos },
    //         { title: 'Package', value: selectedPackage?.package_name },
    //         { title: 'Remaining Credit', value: 0 },
    //         { title: 'Subtotal', value: "$" + subtotal },
    //         { title: 'Tax', value: "$" + taxTotal },
    //         { title: 'GrandTotal', value: "$" + grandTotal },

    //     ]
    // }
    // else {
    //     billProperties = [
    //         { title: 'Total Photos', value: totalPhotos },
    //         { title: 'Package', value: userData.subscribedPackage },
    //         { title: 'Remaining Credit', value: remainingCredit },
    //         { title: 'Subtotal', value: "$" + subtotal },
    //         { title: 'Tax', value: "$" + taxTotal },
    //         { title: 'GrandTotal', value: "$" + grandTotal },

    //     ]
    // }






    return (
        <div className='bg-white rounded p-5 '>
            <h3 className='font-bold text-xl mb-5'> Summary</h3>



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
                subTotal={subTotal}
                taxTotal={taxTotal}
                perPhotoCost={perPhotoCost}
                grandTotal={grandTotal}
                remainingCredit={remainingCredit}
                totalPhotos={totalPhotos}
            />

        </div>
    );
};

export default BillingRightSide;