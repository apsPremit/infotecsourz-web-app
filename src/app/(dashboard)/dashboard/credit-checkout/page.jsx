import PaypalCreditCheckout from '@/components/dashboard/BuyCredit/PaypalCreditCheckout';
import React from 'react';

const page = ({ searchParams }) => {
  const price = parseFloat(searchParams.price);
  const credit = parseInt(searchParams.credit);
  const sub = searchParams.sub;
  const details = { price, credit, subscription_id: sub };
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <PaypalCreditCheckout orderDetails={details} />
    </div>
  );
};

export default page;
