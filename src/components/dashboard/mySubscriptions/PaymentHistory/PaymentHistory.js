import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const PaymentHistory = ({ transactions }) => {
  return (
    <>
      {transactions?.length > 0 && (
        <div>
          <h1 className=' medium mb-3 ml-3 whitespace-nowrap text-2xl  text-gray-700'>
            Payment History
          </h1>
          <div className='rounded border bg-white p-10'>
            <div className='flex flex-col bg-white'>
              <div className='-m-1.5 overflow-x-auto'>
                <div className='inline-block min-w-full p-1.5 align-middle'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full divide-y divide-gray-200 '>
                      <thead>
                        <tr className=''>
                          <th
                            scope='col'
                            className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                          >
                            Date
                          </th>
                          <th
                            scope='col'
                            className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                          >
                            Description
                          </th>
                          <th
                            scope='col'
                            className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                          >
                            Amount
                          </th>
                          <th
                            scope='col'
                            className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                          >
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className='dark:divide-gray-700 divide-y divide-gray-200'>
                        {transactions?.map((transaction, i) => (
                          <tr key={transaction._id} className='text-gray-700'>
                            <td className='text-sm '>
                              {moment(transaction?.createdAT).format(
                                'MM/D/YYYY'
                              )}
                            </td>
                            <td className='text-sm '>{transaction?.pay_for}</td>
                            <td className='text-sm '>
                              ${transaction?.total_amount}
                            </td>
                            <td className='text-sm cursor-pointer'>
                              <Link
                                href={`/dashboard/invoice/${transaction.invoice_id}`}
                                className='text-main hover:underline'
                              >
                                Download Invoice
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
