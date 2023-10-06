"use client"
import { baseUrl } from '@/utils/functions/baseUrl';
import downloadImage from '@/utils/functions/downloadImage';
import axios from 'axios';
import moment from 'moment';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RxDotFilled } from 'react-icons/rx';

const OrderRow = ({ order }) => {
    const router = useRouter()
    const { _id, orderId, orderName, grandTotal, status, createdAt, returnTime, paymentStatus, invoiceStatus, deliveredFileUrl } = order || {}
    console.log('order', order)



    const bucketName = process.env.NEXT_PUBLIC_ADMIN_UPLOAD_IMAGE_BUCKET


    return (

        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-500 ">
                {orderId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black ">
                {
                    status === 'delivered' && (deliveredFileUrl ? <Link target='_blank' href={deliveredFileUrl}><button className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'>Download</button></Link>
                        :
                        <Link target='_blank' href={`${baseUrl}/image?bucketName=${bucketName}&folderName=${orderId}`}>
                            <button className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'>Download</button>
                        </Link>)
                }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black font-bold ">
                ${grandTotal.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm     ">
                <span className={`flex items-center p-1 bg-green-100 ${status === 'denied' ? 'text-red-500 bg-red-100' : 'text-green-500'}`}>
                    <span className=' text-xl '><RxDotFilled /></span>
                    <span className=''>{status}</span>
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
                {moment(createdAt).format("MMM Do YY")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
                {returnTime} Hours
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
                {paymentStatus}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
                {
                    invoiceStatus === 'available' && <Link className='underline' href={`/dashboard/invoice/${orderId}`}>invoice</Link>
                }
            </td>



        </tr>

    );
};

export default OrderRow;