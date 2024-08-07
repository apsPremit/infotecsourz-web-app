'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import logoFull from '../../../../../public/images/others/logo-full.png';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/functions/baseUrl';
import moment from 'moment';
import './invoice.css';

const Invoice = ({ invoice }) => {
  const componentPDF = useRef();

  const {
    user,
    id,
    sender,
    createdAT,
    items,
    customerName,
    country,
    order_name,
    discount,
    paymentStatus,
    photoRequirements,
    subTotal,
    grandTotal,
    taxTotal,
    date,
    taxRate,
    transaction,
    fullName,
    transactionId,
  } = invoice || {};

  const { additional } = photoRequirements || {};
  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'invoice',
  });
  const formateBillingAddress = (address) => {
    const arr = address.split(',');
    return {
      name: arr[0],
      street: arr[1],
      city: arr[2],
      postal: arr[3],
      country: arr[4],
    };
  };

  return (
    <div>
      <div className='mx-auto  my-4 max-w-[85rem] sm:my-10 lg:px-8 '>
        <div className='mb-3 flex justify-end'>
          <button
            onClick={generatePdf}
            className='rounded bg-main px-3 py-1.5 text-white hover:bg-mainHover'
          >
            Print Invoice
          </button>
        </div>
        <div
          ref={componentPDF}
          className='mx-auto w-full rounded-lg   border bg-white lg:w-3/4'
        >
          {/* Card */}
          <div className='p-5 md:p-16 '>
            {/* Grid */}
            <div className=''>
              <div>
                <Image
                  src={logoFull}
                  width={150}
                  height={100}
                  alt='company logo'
                />
                <address className='dark:text-gray-200  mt-2  not-italic text-gray-800'>
                  <span className='text-md'> {sender?.name}</span>
                  <br />
                  <span className='text-sm'>{sender?.address}</span>
                </address>
              </div>
            </div>

            <div className='relative my-5'>
              <h2 className='invoice-asset dark:text-gray-200 text-2xl font-semibold uppercase text-gray-800 md:text-2xl'>
                Invoice
              </h2>
            </div>

            <div>
              <p className='text-sm font-bold uppercase'>to</p>
              <div className='grid grid-cols-1 gap-y-5 md:grid-cols-2'>
                <div>
                  <p className='text-lg font-bold uppercase'>{user.name}</p>
                  {transaction?.shipping_address && (
                    <p className='text-sm'>
                      {
                        formateBillingAddress(transaction?.shipping_address)
                          .name
                      }
                      ,
                      {
                        formateBillingAddress(transaction?.shipping_address)
                          .street
                      }
                      <br />
                      {
                        formateBillingAddress(transaction?.shipping_address)
                          .city
                      }
                      ,
                      {
                        formateBillingAddress(transaction?.shipping_address)
                          .postal
                      }
                      ,
                      {
                        formateBillingAddress(transaction?.shipping_address)
                          .country
                      }
                    </p>
                  )}
                </div>
                <div className='flex md:justify-end md:gap-x-20'>
                  <div className='capitalize'>
                    <p className='font-bold '>Invoice no:</p>
                    <p className='whitespace-nowrap font-bold'>
                      Transaction Id:
                    </p>
                    <p>date:</p>
                    <p>status:</p>
                  </div>
                  <div>
                    <p className='font-bold'>{id}</p>
                    <p className='font-bold'>
                      {transaction?.transaction_id || <br />}
                    </p>
                    <p>{moment(createdAT).format('D MMMM  YYYY')}</p>
                    <p>{transaction?.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* order description  */}

            <div className='flex flex-col bg-white'>
              <div className='-m-1.5 overflow-x-auto'>
                <div className='inline-block min-w-full p-1.5 align-middle'>
                  <div className='overflow-hidden'>
                    <table className='my-5 min-w-full divide-y divide-gray-200 '>
                      <thead>
                        <tr className='border-b-2 border-t-2 border-b-gray-400 border-t-gray-400  '>
                          <th
                            scope='col'
                            className='whitespace-nowrap px-6 py-2 text-start text-sm font-bold'
                          >
                            No
                          </th>
                          <th
                            scope='col'
                            className='whitespace-nowrap px-6 py-2 text-start text-sm font-bold'
                          >
                            Description
                          </th>
                          <th
                            scope='col'
                            className='whitespace-nowrap px-6 py-2 text-start text-sm font-bold'
                          >
                            QTY
                          </th>
                          <th
                            scope='col'
                            className='whitespace-nowrap px-6 py-2 text-start text-sm font-bold '
                          >
                            Price
                          </th>
                          <th
                            scope='col'
                            className='whitespace-nowrap px-6 py-2 text-start text-sm font-bold '
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className='dark:divide-gray-700 divide-y divide-gray-200 '>
                        {items.map((item, i) => (
                          <tr
                            className='border-b-2 border-b-gray-400'
                            key={item.name}
                          >
                            <td className='whitespace-nowrap px-6 py-2 text-start text-sm '>
                              {i + 1}
                            </td>
                            <td className='whitespace-nowrap px-6 py-2 text-start text-sm '>
                              {item.name}
                            </td>
                            <td className='whitespace-nowrap px-6 py-2 text-start text-sm '>
                              {item.quantity}
                            </td>
                            <td className='whitespace-nowrap px-6 py-2 text-start text-sm '>
                              {item.price}
                            </td>
                            <td className='whitespace-nowrap px-6 py-2 text-start text-sm '>
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* end table  */}

            <div className='mt-5 grid grid-cols-1 gap-8 font-bold capitalize md:mt-0 md:grid-cols-2'>
              <div>
                <div>
                  <h3 className='mb-1 mt-3 text-sm font-bold'>
                    Terms and conditions
                  </h3>
                  <p className='text-xs font-normal'>
                    Please send payment within due date. There will be 10%
                    interest charge per month on late payment.
                  </p>
                </div>
              </div>
              <div>
                <div className='mt-5  flex justify-start gap-x-20 md:mt-0 md:justify-end'>
                  <div className='space-y-1.5'>
                    <p>sub total:</p>
                    <p>tax</p>
                    <p>discount: </p>
                  </div>
                  <div className='space-y-1.5'>
                    <p>${transaction?.subtotal?.toFixed(2)}</p>
                    <p>${transaction?.tax_total?.toFixed(2)}</p>
                    <p>{transaction?.discount_rate}%</p>
                  </div>
                </div>
                <div className='grandtotal-asset text-md relative mt-5 flex items-center justify-between bg-main px-5 py-1.5 font-bold text-white md:text-lg'>
                  <h3 className=' mr-5'>Grand total</h3>
                  <h3>${transaction?.total_amount?.toFixed(2)}</h3>
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
