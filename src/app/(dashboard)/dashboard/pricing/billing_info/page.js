import PackageBillingInfo from '@/components/dashboard/billing/PackageBillingInfo/PackageBillingInfo';
import { baseUrl } from '@/utils/functions/baseUrl';
import React from 'react';

const PricingBillingInfo = async (props) => {
  const packageId = props?.searchParams?.package;

  const getPackage = async () => {
    try {
      const res = await fetch(`${baseUrl}/package/${packageId}`);
      const result = await res.json();
      return result?.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || 'something went wrong');
    }
  };

  const pack = await getPackage();

  return (
    <div className='min-h-screen '>
      <PackageBillingInfo pack={pack} />
    </div>
  );
};

export default PricingBillingInfo;
