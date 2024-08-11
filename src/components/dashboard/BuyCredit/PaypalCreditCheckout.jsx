'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import config from '@/config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PaypalCreditCheckout = ({ orderDetails, agree = true }) => {
  let validateData = null;
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);

  const paypalClientId = config.paypal_client_id;

  const initialOptions = {
    clientId: paypalClientId,
    vault: false,
    currency: 'USD',
    intent: 'capture',
  };

  const buyCredit = async (data) => {
    try {
      const response = await axios.post(
        `${config.api_base_url}/credits/buy-credit`,
        data
      );
      const result = await response.data;
      return result;
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <div className='w-full lg:w-1/3 mx-auto border rounded bg-white p-7'>
      <div className='border p-5 rounded mb-5'>
        <div className='mb-5 flex justify-between items-center'>
          <label className='mb-1 block text-sm' htmlFor='loginEmail'>
            Credit
          </label>
          <div>
            <p>{orderDetails.credit}</p>
          </div>
        </div>

        <div className=' flex justify-between items-center'>
          <label className='mb-1 block text-sm' htmlFor='loginEmail'>
            Total
          </label>
          <div>
            <p className='font-bold'>${orderDetails.price}.00</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center '>
          <ImSpinner2 size={25} className='animate-spin' />
        </div>
      ) : (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            disabled={!agree}
            style={{ label: 'checkout' }}
            createOrder={async (data, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',

                purchase_units: [
                  {
                    // description: 'purchase_credit',
                    // reference_id: orderDetails.id,
                    custom_id: orderDetails.id,
                    amount: {
                      currency_code: 'USD',
                      value: parseFloat(orderDetails?.price),
                    },
                    // items: [
                    //   {
                    //     name: 'credit_purchase',
                    //     quantity: 1,
                    //   },
                    // ],
                  },
                ],
              });

              // await createOrder();
            }}
            onApprove={async (data, actions) => {
              const capture = await actions.order.capture();
              const order = await actions.order.get();

              if (capture.status === 'COMPLETED') {
                const response = await buyCredit({
                  ...orderDetails,
                  capture_id: capture.id,
                  order_id: order.id,
                });
                if (response.success) {
                  router.replace(
                    `/credit-success?credit=${orderDetails.credit}`
                  );
                }
              }
            }}
            onError={(error) => {
              console.log('payment error', error);
              return toast.error(error.message);
            }}
          />
        </PayPalScriptProvider>
      )}
      <Toaster />
    </div>
  );
};

export default PaypalCreditCheckout;
