import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MyBillingPage from '@/components/dashboard/mySubscriptions/MyBillingPage/MyBillingPage';
import PaymentHistory from '@/components/dashboard/mySubscriptions/PaymentHistory/PaymentHistory';
import PlanBox from '@/components/dashboard/mySubscriptions/Planbox/Planbox';
import config from '@/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const MyBilling = () => {
  const session = getServerSession(authOptions);
  return <MyBillingPage session={session} />;
};

export default MyBilling;
