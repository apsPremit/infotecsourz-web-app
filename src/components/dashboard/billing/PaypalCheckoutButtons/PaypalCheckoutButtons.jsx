'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../../../../context/StateProvider';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../shared/Loader/Loader';
import { ImSpinner2 } from 'react-icons/im';
import Link from 'next/link';
import config from '@/config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PaypalCheckoutButtons = ({ orderDetails, agree }) => {
  const session = useSession();
  const user = session?.data?.user;
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

  const verifyOrder = async (orderDetails, paymentSource, accessToken) => {
    console.log('call verify');
    const response = await fetch(`${config.api_base_url}/orders/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ orderDetails, paymentSource }),
    });
    return response;
  };

  const createNewOrder = async (orderDetails, paymentDetails) => {
    try {
      const response = await fetch(
        `${config.api_base_url}/orders/create-order/pay-as-go`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ orderDetails, paymentDetails }),
        }
      );
      const result = await response.json();
      if (!result.success) {
        return toast.error('something went wrong!');
      }
      router.replace(`/order_success?orderId=${result?.data?.id}`);
    } catch (error) {
      console.log('error=', error);
      return toast.error('something went wrong!');
    }
  };

  return (
    <>
      {/* terms  */}

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
              const validationResult = await verifyOrder(
                orderDetails,
                data.paymentSource,
                user.accessToken
              );

              if (!validationResult.ok) {
                throw new Error('something went wrong');
              }
              const validateResult = await validationResult.json();
              validateData = validateResult.data;
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: orderDetails?.grand_total?.toFixed(2),
                    },
                  },
                ],
              });

              // await createOrder();
            }}
            onApprove={async (data, actions) => {
              actions.order.capture();
              const successData = await actions.order.get();
              await createNewOrder(validateData, successData);
            }}
            onError={(error) => {
              console.log('payment error', error);
              return toast.error(error.message);
            }}
          />
        </PayPalScriptProvider>
      )}
      <Toaster />
    </>
  );
};

export default PaypalCheckoutButtons;
