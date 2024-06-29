'use client';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { StateContext } from '@/context/StateProvider';
import randomGenerator from '@/utils/functions/randomGenerator';
import config from '@/config';
import useUpdateSession from '@/hook/useUpdateSession';

const NoPaymentCheckout = ({ plan, user }) => {
  const [isProcessing, setProcessing] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const { taxRate } = useContext(StateContext);
  const router = useRouter();
  const params = useSearchParams();
  const { updateSession } = useUpdateSession();
  const [paymentMethod, setPaymentMethod] = useState('paypal / credit card');
  const { plan_name, price, credit, validity, type } = plan || {};
  // console.log("ifo", packageInfo);

  let subTotal = price;
  let taxTotal = (price / 100) * taxRate;
  let grandTotal = subTotal + taxTotal;

  let billProperties = [
    { title: 'Package Name', value: plan_name },
    {
      title: 'Validity',
      value: type === 'pay-as-go' ? 'unlimited' : validity + 'Days',
    },
    { title: 'Credit', value: type === 'pay-as-go' ? 'unlimited' : credit },
    { title: 'Package Price', value: '$' + price },
    { title: 'Subtotal', value: '$' + price },
    { title: 'Tax', value: '$' + price },
    { title: 'GrandTotal', value: '$' + price },
  ];
  // const generatedId = generateOrderId();
  const confirmSubscribe = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${config.api_base_url}/subscriptions/create-subscription-no-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ plan_id: plan.id, user_id: user.userId }),
        }
      );
      const result = await response.json();
      if (result.success) {
        await updateSession(result.data);
        router.refresh();
        router.replace('/subscription-success');
      }
      return;
    } catch (error) {
      setProcessing(false);
      return console.log(error);
    }
  };

  return (
    <div className='w-full lg:w-1/2 mx-auto '>
      {/* right side  */}
      <div className='bg-white p-10'>
        <h3 className='font-bold text-xl mb-5'>Summary</h3>

        {/* properties  */}
        <div className='my-5 '>
          {billProperties.map((property, index) => (
            <div className='my-3 ' key={index}>
              <div className='flex justify-between items-center '>
                <h3 className='text-[#ADACB0]'>{property?.title}</h3>
                <h3>{property?.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <hr />

        {/* payment method  */}

        <div className='flex items-center space-x-3 my-7'>
          <div>
            <p className='px-5 py-2.5 border rounded text-2xl '>$</p>
          </div>
          <div>
            <h3 className='text-xl font-bold'>
              <span className='mr-1'>$</span> {price?.toFixed(2)}{' '}
              <span>USD</span>
            </h3>
            <p className='text-neutral'>Cost</p>
          </div>
        </div>

        {/* billing btn and process  */}
        <div>
          <button
            disabled={!isTermsAgreed || isProcessing}
            onClick={confirmSubscribe}
            className='w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer'
          >
            {isProcessing ? 'Processing...' : 'Subscribe'}
          </button>
          <label
            htmlFor='agree_terms'
            className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'
          >
            <input
              onChange={() => setIsTermsAgreed(!isTermsAgreed)}
              id='agree_terms'
              checked={isTermsAgreed}
              type='checkbox'
              className='scale-125 mt-1'
            />
            <p className='text-sm'>
              I accept
              <Link
                target='_blank'
                href='https://www.infotecsourz.com/terms-and-conditions/'
                className='text-main hover:underline'
              >
                Terms & Conditions
              </Link>
            </p>
          </label>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default NoPaymentCheckout;
