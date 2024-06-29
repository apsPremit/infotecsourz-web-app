import React from 'react';
import NoPaymentCheckout from '../../../../../components/dashboard/package/NoPaymentCheckout/NoPaymentCheckout';
import config from '@/config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const getPlan = async (id, user) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  try {
    const response = await fetch(`${config.api_base_url}/plans/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const SubscriptionNoPayment = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const id = searchParams.plan;
  const plan = await getPlan(id, session.user);
  // console.log("plan", plan);
  return (
    <div>
      <NoPaymentCheckout plan={plan} user={session.user} />
    </div>
  );
};

export default SubscriptionNoPayment;
