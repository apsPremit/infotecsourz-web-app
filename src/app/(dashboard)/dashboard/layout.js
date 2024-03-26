import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import StateProvider from '@/context/StateProvider';
import React from 'react';

const layout = ({ children }) => {
  return (
    <StateProvider>
      <div className='grid grid-cols-12 gap-5  mx-auto'>
        <div className='col-span-12 lg:col-span-2'>
          <Sidebar />
        </div>
        <div className='w-full mx-auto bg-dashboard_background col-span-12 lg:col-span-10'>
          <div className='bg-white px-5 border-b'>
            <DashboardHeader />
          </div>
          <div className='px-5 max-w-[1300px] mx-auto'>{children}</div>
        </div>
      </div>
    </StateProvider>
  );
};

export default layout;
