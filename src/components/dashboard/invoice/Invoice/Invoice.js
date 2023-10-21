"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import logoFull from '../../../../../public/images/others/logo-full.png'
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import moment from 'moment';
import './invoice.css'



const Invoice = () => {
    const componentPDF = useRef()
    const { id } = useParams()

    const [invoiceData, setInvoiceData] = useState({})

    useEffect(() => {
        // setLoading(true)
        axios.get(`${baseUrl}/invoice/${id}`)
            .then(res => {

                setInvoiceData(res.data)
                // setLoading(false)
            })
            .catch(err => console.log(err))

    }, [id])


    const { orderId, customerName, customerAddress, orderName, discount, paymentStatus, photoRequirements, subTotal, grandTotal, taxTotal, date, dueDate, taxRate, paypalAccountNumber, swiftCode, bankAccountName, bankAccountNumber, bankAddress, bankName } = invoiceData || {}
    console.log(invoiceData)

    const { additional } = photoRequirements || {}
    const generatePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'invoice',
    })


    console.log(invoiceData)


    return (
        <div>

            <div className="max-w-[85rem]  lg:px-8 mx-auto my-4 sm:my-10 ">
                <div className='flex justify-end mb-3'>
                    <button onClick={generatePdf} className='px-3 py-1.5 bg-main hover:bg-mainHover text-white rounded'>Print Invoice</button>
                </div>
                <div ref={componentPDF} className="w-full lg:w-3/4 mx-auto   bg-white border rounded-lg">

                    {/* Card */}
                    <div className="p-5 md:p-16 ">
                        {/* Grid */}
                        <div className="">
                            <div>
                                <Image
                                    src={logoFull}
                                    width={150}
                                    height={100}
                                    alt='company logo'
                                />
                                <address className="mt-2  text-sm not-italic text-gray-800 dark:text-gray-200">
                                    199 DB Road,
                                    <br />
                                    Gaibandha-5700,
                                    <br />
                                    Bangladesh

                                </address>
                            </div>

                        </div>


                        <div className="my-5 relative">
                            <h2 className="invoice-asset text-2xl md:text-2xl font-semibold uppercase text-gray-800 dark:text-gray-200">
                                Invoice
                            </h2>

                        </div>

                        <div >
                            <p className='uppercase text-sm font-bold'>to</p>
                            <div className='grid grid-cols-1 md:grid-cols-2 '>
                                <div>

                                    <p className='uppercase font-bold text-lg'>{customerName}</p>
                                    <p className='text-xs '>{customerAddress}</p>
                                </div>
                                <div className='flex md:justify-end md:gap-x-20'>
                                    <div className='capitalize'>
                                        <p className='font-bold '>Invoice no:</p>
                                        <p>date:</p>
                                        <p>Due date:</p>
                                        <p>status:</p>
                                    </div>
                                    <div>
                                        <p className='font-bold'>{orderId}</p>
                                        <p>{moment(date).format("D MMMM  YYYY")}</p>
                                        <p>{moment(dueDate).format("D MMMM  YYYY")}</p>
                                        <p>{paymentStatus}</p>

                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* order description  */}

                        <div className="flex flex-col bg-white">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 my-5 ">
                                            <thead>
                                                <tr className='border-t-2 border-b-2 border-b-gray-400 border-t-gray-400  '>
                                                    <th scope="col" className="px-6 py-2 text-start text-sm font-bold whitespace-nowrap"
                                                    >
                                                        No
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 text-start text-sm font-bold whitespace-nowrap"
                                                    >
                                                        Description
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 text-start text-sm font-bold whitespace-nowrap"
                                                    >
                                                        QTY
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 text-start text-sm font-bold whitespace-nowrap "
                                                    >
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 text-start text-sm font-bold whitespace-nowrap "
                                                    >
                                                        Total
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                                                <tr className='border-b-2 border-b-gray-400'>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-start ">
                                                        1
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-start ">
                                                        <span className='font-bold mb-3 block whitespace-break-spaces'> {orderName} </span>
                                                        <p className='flex flex-wrap'>
                                                            {
                                                                additional?.map((item, index) => <span
                                                                    className="after:content-[','] mr-1"
                                                                    key={index}>
                                                                    {item}
                                                                </span>)
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-start ">
                                                        1
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-start ">
                                                        ${subTotal?.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-start ">
                                                        ${grandTotal?.toFixed(2)}
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end table  */}

                        <div className='font-bold capitalize grid grid-cols-1 md:grid-cols-2 mt-5 md:mt-0 gap-8'>

                            <div>
                                <h3 className='font-bold text-sm mb-3'>Payment Method</h3>
                                <div className='space-y-1'>
                                    <p className='capitalize text-xs font-semibold'>Paypal payment:
                                        <span className='text-gray-500 font-medium ml-1'>{paypalAccountNumber}</span>
                                    </p>
                                    <p className='capitalize text-xs font-semibold'>Account Name:
                                        <span className='text-gray-500 font-medium ml-1'>{bankAccountName}</span>
                                    </p>
                                    <p className='capitalize text-xs font-semibold'>Account Number:
                                        <span className='text-gray-500 font-medium ml-1'>{bankAccountNumber}</span>
                                    </p>
                                    <p className='capitalize text-xs font-semibold'>Bank Name:
                                        <span className='text-gray-500 font-medium ml-1'>{bankName}</span>
                                    </p>
                                    <p className='capitalize text-xs font-semibold'>Address:
                                        <span className='text-gray-500 font-medium ml-1'>{bankAddress}</span>
                                    </p>
                                    <p className='capitalize text-xs font-semibold'>Swift code:
                                        <span className='text-gray-500 font-medium ml-1'>{swiftCode}</span>
                                    </p>
                                </div>


                                <div>
                                    <h3 className='font-bold text-sm mt-3 mb-1'>Terms and conditions</h3>
                                    <p className='text-xs font-normal'>Please send payment within due date. There will be 10% interest charge per month on late payment. </p>
                                </div>



                            </div>
                            <div>
                                <div className='flex  justify-start md:justify-end gap-x-20 mt-5 md:mt-0'>
                                    <div className='space-y-1.5'>
                                        <p>sub total:</p>
                                        <p>tax <span className='text-sm'>({taxRate}%)</span>: </p>
                                        <p>discount: </p>
                                    </div>
                                    <div className='space-y-1.5'>
                                        <p>${subTotal?.toFixed(2)}</p>
                                        <p>${taxTotal?.toFixed(2)}</p>
                                        <p>${discount?.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='grandtotal-asset relative bg-main py-1.5 text-white font-bold text-md md:text-lg flex items-center justify-between px-5 mt-5'>
                                    <h3 className=' mr-5'>Grand total</h3>
                                    <h3>${grandTotal?.toFixed(2)}</h3>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Invoice;