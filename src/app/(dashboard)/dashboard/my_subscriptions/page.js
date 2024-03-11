import { nextOption } from '@/app/api/auth/[...nextauth]/route';
import AllSubscriptions from '@/components/dashboard/mySubscriptions/AllSubscriptions/AllSubscriptions';
import PlanBox from '@/components/dashboard/mySubscriptions/Planbox/Planbox';
import { baseUrl } from '@/utils/functions/baseUrl';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const fetchSubscriptions = async () => {
  try {
    const session = await getServerSession(nextOption);
    if (session) {
      const response = await fetch(
        `${baseUrl}/subscription/${session?.user?.email}`
      );
      const result = await response.json();

      return result.data;
    }
  } catch (error) {
    console.log('load subscription', error);
  }
};

const MyBilling = async () => {
  const subscriptions = await fetchSubscriptions();

  if (!subscriptions) {
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
      {subscriptions?.length > 0 ? (
        <div className=''>
          <div className='mx-auto mb-10 w-full lg:w-3/4'>
            <PlanBox subscriptions={subscriptions} />
          </div>

          <div className='mx-auto mb-10 w-full lg:w-3/4'>
            <AllSubscriptions subscriptions={subscriptions} />
          </div>
        </div>
      ) : (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
          <h3>
            You Have no any subscription,
            <Link href='/dashboard/pricing'>
              <span className='text-main'> Please Subscribe</span>
            </Link>
          </h3>
        </div>
      )}
    </>
  );
};

export default MyBilling;
