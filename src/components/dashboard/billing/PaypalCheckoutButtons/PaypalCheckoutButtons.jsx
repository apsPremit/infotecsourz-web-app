'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../../../../context/StateProvider';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../shared/Loader/Loader';
import { ImSpinner2 } from 'react-icons/im';
import Link from 'next/link';

const PaypalCheckoutButtons = ({ orderDetails, agree }) => {
  console.log(orderDetails);
  let validateData = null;

  const { isTermsAgreed, setIsTermsAgreed, taxRate } = useContext(StateContext);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const paypalClientId =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_PAYPAL_SB_API_KEY
      : process.env.NEXT_PUBLIC_PAYPAL_API_KEY;
  console.log({ paypalClientId, env: process.env.NODE_ENV });
  const initialOptions = {
    clientId: paypalClientId,
    vault: false,
    currency: 'USD',
    intent: 'capture',
  };

  const verifyOrder = async (orderDetails, paymentSource) => {
    console.log('call verify');
    const response = await fetch('/api/order/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderDetails, paymentSource }),
    });
    return response;
  };

  const createNewOrder = async (orderDetails, paymentDetails) => {
    console.log('validate data from create new order', validateData);
    try {
      const response = await fetch('/api/order/create-order/pay-as-go', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetails, paymentDetails }),
      });
      const result = await response.json();
      console.log('result', result);
      return result;
    } catch (error) {
      console.log('error=', error);
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
                data.paymentSource
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
              console.log('payment successs data=>>>', successData);
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
