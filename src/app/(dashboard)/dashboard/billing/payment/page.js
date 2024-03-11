import Payment from '@/components/dashboard/package/Payment/Payment';
import React from 'react';

const OrderPayment = (params) => {
  const price = parseFloat(params?.searchParams?.p);

  return (
    <div>
      <Payment price={price} path={'order'} />
    </div>
  );
};

export default OrderPayment;
