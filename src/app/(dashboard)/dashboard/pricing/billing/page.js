import PricingBilling from '@/components/dashboard/package/PricingBilling/PricingBilling';
import React from 'react';

export const metadata = {
    title: "Billing | Infotecsourz",
    description: "Photo Retouching App"
}
const page = () => {
    return (
        <div className='min-h-screen'>
            <PricingBilling />
        </div>
    );
};

export default page;