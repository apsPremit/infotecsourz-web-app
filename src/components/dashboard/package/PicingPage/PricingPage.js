'use client';
import { baseUrl } from '@/utils/functions/baseUrl';
import React, { useEffect, useState } from 'react';
import SinglePackage from '../SinglePackage/SinglePackage';
import PricingTable from '@/components/shared/PricingTable/PricingTable';
import config from '@/config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';

const PricingPage = ({ plans }) => {
  const [allPackage, setAllPackage] = useState([]);
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div>
      <div className='mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:px-10'>
        {plans?.map((plan) => (
          <SinglePackage key={plan._id} plan={plan} />
        ))}
      </div>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
