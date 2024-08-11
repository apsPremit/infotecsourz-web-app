'use client';
import SwitchToggle from '@/components/ui/SwitchToggle';
import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
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
          className='text-xl lg:hidden'
        >
          {' '}
          <RxHamburgerMenu />
        </button>
        <h2 className='text-sm font-bold lg:text-2xl ms-2'>New Order</h2>
      </div>
      {/* <SwitchToggle /> */}
      <div className='flex flex-nowrap items-center gap-2'>
        <button
          onClick={newOrderHandler}
          className='rounded-lg bg-main px-3 py-2 text-sm text-white'
        >
          Create new Order
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
