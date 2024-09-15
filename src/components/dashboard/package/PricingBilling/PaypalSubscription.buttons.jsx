import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/StateProvider';
import { useAuth } from '@/context/AuthProvider';
import config from '@/config';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const PaypalSubscriptionButtons = ({ plan_id, agree }) => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { userData } = useAuth();
  const session = useSession();
  const accessToken = session?.data?.user?.accessToken;

  useEffect(() => {
    setLoading(false);
  }, []);

  const paypalClientId = config.paypal_client_id;
  const initialOptions = {
    clientId: paypalClientId,
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
            disabled={!agree}
            style={{ label: 'subscribe' }}
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: plan_id,
                custom_id: userData?.id,
              });
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await axios.post(
                  `${config.api_base_url}/subscriptions/create-subscription`,
                  data,
                  { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                const result = await response.data;
                if (result.success) {
                  router.replace(
                    `/subscription-success?id=${result?.data?.subscriptionId}`
                  );
                }
              } catch (error) {
                console.log('payment error', error);
              }
            }}
            onError={(error) => {
              console.log('error', error);
              return toast.error('subscription failed try again');
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default PaypalSubscriptionButtons;
