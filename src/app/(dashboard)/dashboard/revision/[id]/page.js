import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import RevisionForm from '@/components/dashboard/revision/RevisionSubmitForm/RevisionSubmitForm';
import Loader from '@/components/shared/Loader/Loader';
import config from '@/config';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react';

const fetchOrder = async (orderId, accessToken) => {
  try {
    const res = await fetch(`${config.api_base_url}/orders/${orderId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const Revision = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const order = await fetchOrder(id, session?.user?.accessToken);

  return (
    <div className=' flex items-center justify-center'>
      <Suspense fallback={<Loader />}>
        <RevisionForm order={order} user={session?.user} />
      </Suspense>
    </div>
  );
};

export default Revision;
