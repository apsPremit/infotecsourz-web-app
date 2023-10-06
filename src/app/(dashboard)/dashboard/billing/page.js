import BillingLeftSide from '@/components/dashboard/billing/BillingLeftSide/BillingLeftSide';
import BillingProcess from '@/components/dashboard/billing/BillingProcess/BillingProcess';
import BillingRightSide from '@/components/dashboard/billing/BillingRightSide/BillingRightSide';
import Modal from '@/components/shared/Modal/Modal';
import Link from 'next/link';
import React from 'react';
import { FaFire } from "react-icons/fa";




const Billing = () => {








    return (
        <div className='lg:px-10 flex justify-center'>


            {/* left side  */}
            {/* <BillingLeftSide /> */}

            {/* right side  */}
            <div className='lg:w-1/2 mx-auto'>
                <BillingRightSide />
            </div>


        </div>
    );
};

export default Billing;