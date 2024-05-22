'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import config from '../../../../config';
import { useAuth } from '../../../../context/AuthProvider';
import axios from 'axios';

const PaypalCheckoutButtons = ({ orderDetails, agree }) => {
  const { userData } = useAuth();
  let validateData = null;
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);

  const initialOptions = {
    clientId: config.paypal_client_id,
    vault: false,
    currency: 'USD',
    intent: 'capture',
  };

  const verifyOrder = async (orderDetails, paymentSource) => {
    console.log('call verify');
    const response = await axios.post(
      `${config.api_base_url}/orders/verify`,
      { orderDetails, paymentSource },
      { headers: { source: 'bigcommerce' } }
    );
    const result = await response.data;
    return result;
  };

  const createNewOrder = async (orderDetails, paymentDetails) => {
    try {
      const response = await axios.post(
        `${config.api_base_url}/orders/create-order/pay-as-go`,
        { orderDetails, paymentDetails },
        { headers: { source: 'bigcommerce' } }
      );
      const result = await response.data;
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
                data.paymentSource
              );
              console.log('validate', validationResult);
              if (!validationResult.success) {
                throw new Error('something went wrong');
              }
              validateData = validationResult?.data;
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: orderDetails?.grand_total?.toFixed(2),
                    },
                    custom_id: orderDetails.id,
                  },
                ],
              });

              // await createOrder();
            }}
            onApprove={async (data, actions) => {
              const successData = await actions.order.capture();
              console.log({ successData });
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
