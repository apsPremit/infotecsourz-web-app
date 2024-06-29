import SuccessOrder from '@/components/dashboard/order_success/SuccessOrder/SuccessOrder';
import React from 'react';
export const metadata = {
  title: 'Order Success | Infotecsourz',
  description: 'Photo Retouching App',
};
const page = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-dashboard_background '>
      <SuccessOrder />
    </div>
  );
};

export default page;
