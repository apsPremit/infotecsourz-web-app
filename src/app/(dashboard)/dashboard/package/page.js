import { getPlan } from '@/utils/functions/getPlan';
import React, { useContext } from 'react';
import { packages } from '@/utils/json/packagePlan';
import SinglePackage from '@/components/dashboard/package/SinglePackage/SinglePackage';
import Link from 'next/link';
import StateProvider from '@/context/StateProvider';

const Plan = async () => {


    return (
        <div>
            <h1 className='text-3xl mt-5 mb-10 font-bold text-center'>Choose Your Plan</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10'>
                {
                    packages.map(plan => <SinglePackage
                        key={plan.id}
                        plan={plan} />)
                }
            </div>
            <div className='flex  justify-center mt-10 mb-5'>
                <Link href='/dashboard/billing'>
                    <button className='text-white px-3.5 py-2 bg-main hover:bg-mainHover rounded flex '>Proceed
                    </button></Link>
            </div>
        </div>
    );
};

export default Plan; 