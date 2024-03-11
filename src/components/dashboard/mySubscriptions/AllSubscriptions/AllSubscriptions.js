import moment from 'moment';
import React from 'react';

const AllSubscriptions = ({ subscriptions }) => {
  if (!subscriptions) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className=' medium mb-3 ml-3 whitespace-nowrap text-2xl  text-gray-700'>
        My Subscriptions
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
                        No
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                      >
                        Id
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                      >
                        Package
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                      >
                        Credit
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500'
                      >
                        Status
                      </th>

                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500 '
                      >
                        Created Date
                      </th>
                      <th
                        scope='col'
                        className=' whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500 '
                      >
                        Expiration
                      </th>
                    </tr>
                  </thead>
                  <tbody className='dark:divide-gray-700 divide-y divide-gray-200'>
                    {subscriptions?.map((sub, i) => (
                      <tr key={sub._id} className='text-gray-700'>
                        <td className='text-sm '>{i + 1}</td>
                        <td className='text-sm '>{sub?.orderId}</td>
                        <td className='text-sm '>{sub?.package}</td>
                        <td className='text-sm '>${sub?.grandTotal || '0'}</td>
                        <td className='text-sm '>{sub?.credit || '0'}</td>
                        <td className='text-sm'>
                          {subscriptions[0] == sub ? 'Active' : 'Inactive'}
                        </td>
                        <td className='text-sm  '>
                          {moment(sub?.createdAt).format('MMM D, YYYY')}
                        </td>
                        <td className='text-sm  '>
                          {sub?.expiration &&
                            moment(sub?.expiration).format('MMM D, YYYY')}
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
  );
};

export default AllSubscriptions;
