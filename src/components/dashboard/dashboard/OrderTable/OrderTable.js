'use client';
import React, { useState } from 'react';
import OrderRow from '../OrderRow/OrderRow';
import { ImSpinner2 } from 'react-icons/im';

const OrderTable = ({ orders }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <div className='flex items-center justify-center text-xl text-main'>
          <ImSpinner2 className='animate-spin' />
        </div>
      ) : (
        orders.length >= 1 && (
          <div className='flex flex-col bg-white'>
            <div className='-m-1.5 overflow-x-auto'>
              <div className='inline-block min-w-full p-1.5 align-middle'>
                <div className='overflow-hidden'>
                  <table className='min-w-full divide-y divide-gray-200 '>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black'
                        >
                          #
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black'
                        >
                          Order Name
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black'
                        >
                          Ready File
                        </th>

                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Created Date
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Return Time
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Details
                        </th>

                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Revision request
                        </th>
                      </tr>
                    </thead>
                    <tbody className='dark:divide-gray-700 divide-y divide-gray-200'>
                      {orders.map((order) => (
                        <OrderRow key={order?._id} order={order} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrderTable;
