'use client';
import React from 'react';
import PlanBox from '../Planbox/Planbox';
import PaymentHistory from '../PaymentHistory/PaymentHistory';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '@/config';
import Loader from '@/components/shared/Loader/Loader';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthProvider';

const getTransactions = async (userId, accessToken) => {
  return await axios.get(
    `${config.api_base_url}/transactions/${userId}/transactions`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const getSubscriptions = async (subscriptionId, accessToken) => {
  return await axios.get(
    `${config.api_base_url}/subscriptions/${subscriptionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const MyBillingPage = () => {
  const { userData } = useAuth();
  const session = useSession();
  const user = session?.data?.user;
  const { data: transactions, isLoading } = useQuery({
    queryKey: 'transactions',
    queryFn: async () => getTransactions(user?.userId, user?.accessToken),
    enabled: !!session,
    select: (data) => data.data.data,
  });
  const { data: subscriptions, isLoading: subscriptionLoading } = useQuery({
    queryKey: 'subscriptions',
    queryFn: async () =>
      getSubscriptions(userData?.subscription?.id, user?.accessToken),
    enabled: !!userData?.subscription,
    select: (data) => data.data.data,
  });

  if (isLoading || subscriptionLoading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        {userData?.subscription === null ? (
          <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <h3>
              You Have no any subscription,
              <Link href='/dashboard/pricing'>
                <span className='text-main'> Please Subscribe</span>
              </Link>
            </h3>
          </div>
        ) : (
          <div className=''>
            <div className='mx-auto mb-10 w-full lg:w-3/4'>
              <PlanBox subscription={subscriptions} />
            </div>

            <div className='mx-auto mb-10 w-full lg:w-3/4'>
              <PaymentHistory transactions={transactions} />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MyBillingPage;
