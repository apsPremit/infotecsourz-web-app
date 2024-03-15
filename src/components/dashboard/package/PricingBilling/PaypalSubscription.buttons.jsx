'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { StateContext } from '@/context/StateProvider';
import config from '@/config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useUpdateSession from '@/hook/useUpdateSession';

const PaypalSubscriptionButtons = ({ plan_id, user }) => {
  const { updateSession } = useUpdateSession();
  const { isTermsAgreed, setIsTermsAgreed, taxRate } = useContext(StateContext);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const userId = user?.userId;
  useEffect(() => {
    setLoading(false);
  }, []);

  const initialOptions = {
    clientId: config.paypal_client_id,
    vault: true,
    currency: 'USD',
    intent: 'subscription',
  };

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center '>
          <ImSpinner2 size={25} className='animate-spin' />
        </div>
      ) : (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            disabled={!isTermsAgreed}
            style={{ label: 'subscribe' }}
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: plan_id,
              });
            }}
            onApprove={async (data, actions) => {
              try {
                const subscriptionDetails = await actions.subscription.get();
                const apiData = {
                  data: {
                    user: userId,
                    plan_id,
                    tax_rate: taxRate,
                    transaction_id: data.orderID,
                    source: data.paymentSource,
                  },
                  paypal_data: subscriptionDetails,
                };

                const response = await fetch(
                  `${config.api_base_url}/subscriptions/create-subscription`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      authorization: `Bearer ${user?.accessToken}`,
                    },
                    body: JSON.stringify(apiData),
                  }
                );
                const result = await response.json();
                if (result.success) {
                  const sessionData = {
                    ...result.data,
                    able_free_trial: false,
                  };
                  await updateSession(sessionData);
                  router.refresh();
                  router.replace('/subscription-success');
                }
              } catch (error) {}
            }}
            onError={(error) => {
              return toast.error('subscription failed try again');
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default PaypalSubscriptionButtons;
