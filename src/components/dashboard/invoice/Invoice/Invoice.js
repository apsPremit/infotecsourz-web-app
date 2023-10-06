"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import logoFull from '../../../../../public/images/others/logo-full.png'
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import moment from 'moment';



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


    const { orderId, name, orderName, paymentStatus, photoRequirements, subTotal, grandTotal, taxTotal, address, dueDate, taxRate, paypalAccountNumber, swiftCode, bankAccountName, bankAccountNumber, bankAddress, bankName } = invoiceData || {}

    const { formats, additional, backgroundColor, selectedAlignments } = photoRequirements || {}
    const generatePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'invoice',
    })





    return (
        <div>

            <div className="max-w-[85rem]  lg:px-8 mx-auto my-4 sm:my-10">
                <div className='flex justify-end mb-3'>
                    <button onClick={generatePdf} className='px-3 py-1.5 bg-main hover:bg-mainHover text-white rounded'>Print Invoice</button>
                </div>
                <div className="sm:w-11/12 lg:w-3/4 mx-auto">

                    {/* Card */}
                    <div ref={componentPDF} className="flex flex-col p-4 sm:p-10 bg-white border rounded-xl dark:bg-gray-800">
                        {/* Grid */}
                        <div className="flex justify-between">
                            <div>
                                <Image
                                    src={logoFull}
                                    width={150}
                                    height={100}
                                    alt='company logo'
                                />
                                <address className="mt-4 font-bold text-sm not-italic text-gray-800 dark:text-gray-200">
                                    199 DB Road, Gaibandha5700, Bangladesh

                                </address>
                            </div>
                            {/* Col */}
                            <div className="text-right">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                                    Invoice
                                </h2>
                                <span className="mt-1 block text-gray-500">#{orderId}</span>

                            </div>
                            {/* Col */}
                        </div>
                        {/* End Grid */}
                        {/* Grid */}
                        <div className="mt-8 grid sm:grid-cols-2 gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Bill to:
                                </h3>
                                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">
                                    {name}
                                </h3>
                                <address className="mt-2 font-bold text-sm not-italic text-gray-500">
                                    {address}
                                </address>
                            </div>
                            {/* Col */}
                            <div className="sm:text-right space-y-2">
                                {/* Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3  text-gray-500 dark:text-gray-200">
                                            Date:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">{moment(new Date()).format("MMM Do YY")}</dd>
                                    </dl>
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3  text-gray-500 dark:text-gray-200">
                                            Due date:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">{dueDate || moment(new Date()).format("MMM Do YY")}</dd>
                                    </dl>
                                    <dl className="grid sm:grid-cols-5 gap-x-3 bg-red-100 pr-3">
                                        <dt className="col-span-3  text-gray-800 font-bold text-lg">
                                            Balance Due
                                        </dt>
                                        <dd className="col-span-2 font-bold text-lg text-gray-800">${grandTotal}</dd>
                                    </dl>

                                </div>

                                {/* End Grid */}
                            </div>
                            {/* Col */}
                        </div>
                        {/* End Grid */}
                        {/* Table */}
                        <div className="mt-6">
                            <div className="">
                                <div className="hidden sm:grid sm:grid-cols-5 bg-gray-700 mt-3 p-3 rounded text-white">
                                    <div className="sm:col-span-2 text-xs font-medium  uppercase">
                                        Item
                                    </div>
                                    <div className="text-left text-xs font-medium  uppercase">
                                        Qty
                                    </div>

                                    <div className="text-right text-xs font-medium  uppercase">
                                        Tax Rate
                                    </div>
                                    <div className="text-right text-xs font-medium  uppercase">
                                        Amount
                                    </div>
                                </div>
                                <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700" />
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-4">
                                    <div className="col-span-full sm:col-span-2">
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Item
                                        </h5>
                                        <div className="font-medium text-gray-800 text-xs dark:text-gray-200">
                                            <p className='font-bold text-sm mb-2'>{orderName}</p>
                                            <p> <span className='font-bold mt-1'>Formats:</span>  {...photoRequirements?.formats || ''}</p>
                                            <p>  <span className='font-bold'>Background:</span>  {backgroundColor || ''}</p>

                                            <p> <span className='font-bold mt-1'>Alignments:</span>
                                                {
                                                    selectedAlignments && Object?.keys(selectedAlignments).map((key) => (
                                                        <label key={key} className="alignment-item">
                                                            <span className="property-name">{key}:</span>{' '}
                                                            <span className="property-value">{selectedAlignments[key]}, </span>
                                                        </label>
                                                    ))
                                                }
                                            </p>


                                            <p className='flex  flex-wrap mt-1'><span className='font-bold'>additional: </span>
                                                {
                                                    additional && additional.map((ed, index) => <span className='mr-1 ' key={index}>{ed},</span>)
                                                }
                                            </p>

                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Qty
                                        </h5>
                                        <p className="text-gray-800 dark:text-gray-200">1</p>
                                    </div>

                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Tax Rate
                                        </h5>
                                        <p className="sm:text-right text-gray-800 dark:text-gray-200">
                                            {taxRate}%
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Amount
                                        </h5>
                                        <p className="sm:text-right text-gray-800 dark:text-gray-200">
                                            {subTotal}
                                        </p>
                                    </div>
                                </div>
                                <div className="sm:hidden border-b border-gray-200 dark:border-gray-700" />
                            </div>
                        </div>
                        {/* End Table */}
                        {/* Flex */}
                        <div className="mt-8 flex sm:justify-end">
                            <div className="w-full max-w-2xl sm:text-right space-y-2">
                                {/* Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-500 dark:text-gray-200">
                                            Subtotal:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">${subTotal}</dd>
                                    </dl>
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-500 dark:text-gray-200">
                                            Tax <span className='text-sm'></span>:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">${taxTotal?.toFixed(2)}</dd>
                                    </dl>

                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-500 dark:text-gray-200">
                                            Total
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">${grandTotal}</dd>
                                    </dl>
                                </div>
                                {/* End Grid */}
                            </div>
                        </div>
                        {/* End Flex */}
                        <div className="mt-8 sm:mt-12 text-sm">
                            <p className='text-gray-500 mb-3 underline'>Payment method</p>
                            <p>Paypal Payment: {paypalAccountNumber}</p>
                            <p className='my-2 font-bold'>Bank Payment:</p>
                            <p>Account Name: {bankAccountName}</p>
                            <p>Account Number: {bankAccountNumber}</p>
                            <p>Bank Name: {bankName}</p>
                            <p>Address: {bankAddress}</p>
                            <p>Swift Code: {swiftCode}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Invoice;