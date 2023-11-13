import React from 'react';
import Plan from '../package/page';


import { packages } from '@/utils/json/packagePlan';
import SinglePackage from '@/components/dashboard/package/SinglePackage/SinglePackage';

export const metadata = {
    title: "Billing Info | Infotecsourz",
    description: "Photo Retouching App"
}
const Pricing = () => {

    return (
        <div>
            <h1 className='text-3xl mt-5 mb-10 font-bold text-center'>Our exclusive subscription packages only made for you</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10 mb-10'>
                {
                    packages.map(plan => <SinglePackage
                        key={plan.id}
                        plan={plan} />)
                }
            </div>
        </div>
    );
};

export default Pricing;