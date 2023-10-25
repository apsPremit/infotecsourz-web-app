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
                    <div className='lg:ml-52 px-5 bg-white'>
                        <DashboardHeader />
                    </div>
                    <div className='lg:ml-52 px-2 lg:px-5 py-3'>
                        {children}
                    </div>
                </div>

            </div >
        </StateProvider>

    );
};

export default layout;