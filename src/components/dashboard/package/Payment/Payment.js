'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { baseUrl } from '@/utils/functions/baseUrl';
import { useContext, useState } from 'react';
import { StateContext } from '@/context/StateProvider';
import { ImSpinner2 } from 'react-icons/im';
import Swal from 'sweetalert2';
import { PaypalProvider } from '@/context/PaypalProvider';

const Payment = ({ path, price }) => {
  const { orderDetails } = useContext(StateContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formatBillingDetails = (obj) => {
    const fullName = obj?.purchase_units?.[0]?.shipping?.name?.full_name || '';
    const addressArray = [];
    const addressObj = obj?.purchase_units?.[0]?.shipping?.address;
    for (const key in addressObj) {
      const value = addressObj[key];
      addressArray?.push(value);
    }
    const billingAddress = addressArray?.toString() || '';
    return { fullName, billingAddress };
  };

  const createOrder = async (data) => {
    return fetch(`${baseUrl}/payment/create-payment-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: {
          description: orderDetails?.orderId,
          cost: price?.toFixed(2),
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${baseUrl}/payment/capture-payment-order/${data?.orderID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: orderDetails.orderId,
        orderDetails,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const paymentResponse = await response.json();
          const details = formatBillingDetails(paymentResponse);
          const paymentDetails = {
            transactionId: paymentResponse?.id || '',
            fullName: details?.fullName,
            billingAddress: details?.billingAddress,
          };
          const orderData = {
            ...orderDetails,
            paymentStatus: 'paid',
            transactionId: paymentResponse.id,
          };
          try {
            setLoading(true);
            const res = await fetch(`${baseUrl}/${path}`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({ orderData, paymentDetails }),
            });
            if (!res.ok) {
              setLoading(false);
              throw new Error('some thing went wrong');
            }
            setLoading(false);
            router.push(
              `/order_success?orderId=${orderDetails?.orderId}&message=Subscription Successful`
            );
          } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire({
              title: 'something went wrong please contact to support',
              icon: 'error',
            });
          }
        }
      })
      .catch((error) => console.log('error', error));
  };

  const handleError = (err) => {
    console.log(err);
    Swal.fire({
      title: 'something went wrong on payment process',
      text: `${err?.message || ''}`,
      icon: 'error',
    });
  };

  return (
    <div className='mt-10  h-screen lg:mt-20 '>
      {loading && (
        <div className='mb-5 flex items-center justify-center text-xl text-main'>
          <ImSpinner2 size={35} className='animate-spin' />
        </div>
      )}
      <div
        className={`mx-auto w-full rounded  border bg-white p-10 shadow-lg md:w-2/5 ${
          loading ? 'hidden' : ''
        }`}
      >
        <PaypalProvider>
          <PayPalButtons
            style={{
              label: 'checkout',
            }}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={(err) => handleError(err)}
          ></PayPalButtons>
        </PaypalProvider>
      </div>
    </div>
  );
};

export default Payment;
