'use client';
import React from 'react';

import { ImSpinner2 } from 'react-icons/im';
import { useGetAllTicketQuery } from '@/redux/services/supportApi';
import { useSession } from 'next-auth/react';
import SupportRow from './SupportRow';

const SupportTable = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading } = useGetAllTicketQuery(user?.userId, {
    skip: !user?.userId,
  });
  const tickets = data?.data;

  return (
    <div>
      {isLoading ? (
        <div className='flex items-center justify-center text-xl text-main'>
          <ImSpinner2 className='animate-spin' />
        </div>
      ) : (
        tickets?.length >= 1 && (
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
                          TicketId
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black'
                        >
                          Subject
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
                          Status
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-black '
                        >
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className='dark:divide-gray-700 divide-y divide-gray-200'>
                      {tickets.map((support) => (
                        <SupportRow key={support?._id} support={support} />
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

export default SupportTable;
