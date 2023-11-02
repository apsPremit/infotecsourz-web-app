import BillingLeftSide from '@/components/dashboard/billing/BillingLeftSide/BillingLeftSide';
import BillingProcess from '@/components/dashboard/billing/BillingProcess/BillingProcess';
import BillingRightSide from '@/components/dashboard/billing/BillingRightSide/BillingRightSide';
import Link from 'next/link';
import React from 'react';
import { FaFire } from "react-icons/fa";




const Billing = () => {


    return (
        <div className='lg:px-10 grid grid-cols-2 gap-x-5'>
            <div>
                <BillingLeftSide />
            </div>
            <div className=''>
                <BillingRightSide />
            </div>


        </div>
    );
};

export default Billing;