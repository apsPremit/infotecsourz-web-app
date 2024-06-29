import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreditBuyForm from '../../../../components/dashboard/BuyCredit/CreditBuyForm';
import config from '@/config';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React from 'react';

const getPlan = async (planId, access_token) => {
  try {
    const response = await axios.get(`${config.api_base_url}/plans/${planId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const result = await response.data;
    return result.data;
  } catch (error) {
    console.log('err', error);
    throw new Error(error.message || 'something went wrong');
  }
};

const page = async ({ searchParams }) => {
  const plan_id = searchParams.plan;
  const session = await getServerSession(authOptions);
  const plan = await getPlan(plan_id, session?.user?.accessToken);

  return (
    <div>
      <div className='flex justify-center items-center h-screen w-full'>
        <CreditBuyForm plan={plan} />
      </div>
    </div>
  );
};

export default page;
