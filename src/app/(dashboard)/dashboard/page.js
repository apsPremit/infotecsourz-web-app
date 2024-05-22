import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { LuMessagesSquare } from 'react-icons/lu';
import Link from 'next/link';
import OrderTable from '@/components/dashboard/dashboard/OrderTable/OrderTable';
import SubscribedPackage from '@/components/dashboard/dashboard/SubscribedPackage/SubscribedPackage';
import FreeTrialBox from '@/components/dashboard/dashboard/FreeTrialBox/FreeTrialBox';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/dist/server/api-utils';
import { baseUrl } from '@/utils/functions/baseUrl';
import Alert from '@/components/shared/Alert/Alert';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import config from '@/config';

export const metadata = {
  title: 'Dashboard | Infotecsourz',
  description: 'Photo Retouching App',
};
const fetchOrders = async (userId, accessToken) => {
  try {
    const orderRes = await fetch(
      `${config.api_base_url}/orders/${userId}/orders`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const orderData = await orderRes.json();
    return orderData.data;
  } catch (error) {}
};

const page = async (props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/login');
  }

  const orders = await fetchOrders(
    session?.user?.userId,
    session?.user?.accessToken
  );

  // const res = await fetch(`${baseUrl}/user/${session?.user?.email}`);
  // const data = await res.json();

  return (
    <div className='bg-[#F5F5F5]  lg:p-5 '>
      {props?.searchParams?.message && (
        <Alert message={props?.searchParams?.message} />
      )}
      <SubscribedPackage />
      <div className='mx-auto grid-cols-3  space-y-5 lg:grid lg:gap-5 lg:space-y-0'>
        <FreeTrialBox />
        <div className='rounded border border-shadow bg-white p-5'>
          <div className=''>
            <p className='border-red-20 flex h-8 w-8 items-center justify-center rounded-full border bg-orange-200 p-1.5 text-xl text-orange-500'>
              <AiOutlineQuestionCircle className='' />
            </p>
          </div>
          <div className='mt-3'>
            <p className='text-lg  font-bold'>Create New Order</p>
            <h3 className='text  text-sm text-[#9f9f9f]'>
              Let start your photo retouching project!
            </h3>
            <Link href='/dashboard/new_order'>
              <button className='mt-3 rounded bg-main px-3 py-1.5 text-white hover:bg-mainHover'>
                Create New Order
              </button>
            </Link>
          </div>
        </div>
        <div className='rounded border border-shadow bg-white p-5'>
          <div className=''>
            <p className='border-red-20 flex h-8 w-8 items-center justify-center rounded-full border bg-pink-200 p-1.5 text-xl text-pink-500'>
              <LuMessagesSquare className='' />
            </p>
          </div>
          <div className='mt-3 '>
            <p className='text-lg  font-bold'>Need Support</p>
            <h3 className='text  text-sm text-[#9f9f9f]'>
              Facing any issue can get support
            </h3>
            <Link href='/dashboard/support'>
              <button className='mt-3 rounded bg-main px-3 py-1.5 text-white hover:bg-mainHover  '>
                Support
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* recent orders  */}
      <h3 className='my-5 w-full bg-white p-5 text-lg font-bold'>
        Recent Orders
      </h3>
      {/* table  */}
      {orders?.length > 0 && <OrderTable orders={orders} />}
    </div>
  );
};

export default page;
