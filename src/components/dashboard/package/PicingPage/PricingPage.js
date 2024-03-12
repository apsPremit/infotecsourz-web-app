'use client';
import { baseUrl } from '@/utils/functions/baseUrl';
import React, { useEffect, useState } from 'react';
import SinglePackage from '../SinglePackage/SinglePackage';
import PricingTable from '@/components/shared/PricingTable/PricingTable';
import config from '@/config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';

const PricingPage = () => {
  const [allPackage, setAllPackage] = useState([]);
  const session = useSession();
  const user = session?.data?.user;

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${config.api_base_url}/plans`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const result = await res.json();
        setAllPackage(result?.data);
      } catch (error) {
        throw new Error(error.message || 'something went wrong');
      }
    };
    fetchPackage();
  }, [user?.accessToken]);

  return (
    <div>
      <div className='mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:px-10'>
        {allPackage?.map((plan) => (
          <SinglePackage key={plan._id} plan={plan} />
        ))}
      </div>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
