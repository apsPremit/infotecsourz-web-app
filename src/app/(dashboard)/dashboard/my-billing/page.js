import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PaymentHistory from '@/components/dashboard/mySubscriptions/PaymentHistory/PaymentHistory';
import PlanBox from '@/components/dashboard/mySubscriptions/Planbox/Planbox';
import config from '@/config';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const fetchPaymentHistories = async (userId, accessToken) => {
  try {
    const response = await axios.get(
      `${config.api_base_url}/transactions/${userId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data?.data;
    return result;
  } catch (error) {}
};
const fetchSubscription = async (subscriptionId, accessToken) => {
  try {
    const response = await axios.get(
      `${config.api_base_url}/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data?.data;

    return result;
  } catch (error) {}
};

const MyBilling = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const transactions = await fetchPaymentHistories(
    user?.userId,
    user?.accessToken
  );

  let subscription = null;
  if (session?.user?.subscription) {
    subscription = await fetchSubscription(
      user?.subscription.id,
      user?.accessToken
    );
  }

  if (!user?.subscription) {
    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <h3>
          You Have no any subscription,
          <Link href='/dashboard/pricing'>
            <span className='text-main'> Please Subscribe</span>
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className=''>
        <div className='mx-auto mb-10 w-full lg:w-3/4'>
          <PlanBox subscription={subscription} />
        </div>

        <div className='mx-auto mb-10 w-full lg:w-3/4'>
          <PaymentHistory transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default MyBilling;
