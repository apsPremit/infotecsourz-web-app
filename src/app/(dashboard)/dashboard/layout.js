import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import StateProvider from '@/context/StateProvider';
import React from 'react';

const layout = ({ children }) => {
  return (
    <StateProvider>
      <div className='flex '>
        <Sidebar />
        <div className='w-full    bg-dashboard_background '>
          <div className='bg-white px-5 lg:ml-52'>
            <DashboardHeader />
          </div>
          <div className='px-2 py-3 lg:ml-52 lg:px-5'>{children}</div>
        </div>
      </div>
    </StateProvider>
  );
};

export default layout;
