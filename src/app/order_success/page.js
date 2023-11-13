
import SuccessOrder from '@/components/dashboard/order_success/SuccessOrder/SuccessOrder';
import React from 'react';
export const metadata = {
    title: "Order Success | Infotecsourz",
    description: "Photo Retouching App"
}
const page = () => {
    return (
        <div className='bg-dashboard_background h-screen flex justify-center items-center '>
            <SuccessOrder />
        </div>
    );
};

export default page;