'use client';
import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Notification from '../dashboard/Notification/Notification';
const DashboardHeader = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(StateContext);
  const newOrderHandler = () => {
    window.location.reload();
    window.location.href = '/dashboard/new_order';
  };

  return (
    <div className='flex items-center justify-between py-5 '>
      <div className='flex items-center'>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className='mr-3 text-xl lg:hidden'
        >
          {' '}
          <RxHamburgerMenu />
        </button>
        <h2 className='text-sm font-bold lg:text-2xl'>New Order</h2>
      </div>

      <div className='flex flex-nowrap items-center gap-2'>
        <button
          onClick={newOrderHandler}
          className='rounded-lg bg-main px-3 py-2 text-sm text-white'
        >
          Create new Order
        </button>
        {/* <Notification /> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
