import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PricingBilling from '@/components/dashboard/package/PricingBilling/PricingBilling';
import config from '@/config';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata = {
  title: 'Billing | Infotecsourz',
  description: 'Photo Retouching App',
};
const Billing = async (props) => {
  const plan_id = props?.searchParams?.plan;
  const session = await getServerSession(authOptions);

  const getPackage = async () => {
    try {
      const res = await fetch(`${config.api_base_url}/plans/${plan_id}`, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });
      const result = await res.json();
      return result?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const plan = await getPackage();

  return (
    <div className='min-h-screen'>
      <PricingBilling plan={plan} />
    </div>
  );
};

export default Billing;
