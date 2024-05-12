import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/StateProvider';
import { useAuth } from '@/context/AuthProvider';
import config from '@/config';

const PaypalSubscriptionButtons = ({ plan_id }) => {
  const { isTermsAgreed } = useContext(StateContext);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { userData } = useAuth();

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
            disabled={!isTermsAgreed}
            style={{ label: 'subscribe' }}
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: plan_id,
                custom_id: userData?.id,
              });
            }}
            onApprove={async (data, actions) => {
              try {
                const subscriptionDetails = await actions.subscription.get();
                if (subscriptionDetails.status === 'ACTIVE') {
                  router.replace('/subscription-success');
                }
              } catch (error) {
                return toast.error(error?.message);
              }
            }}
            onError={() => {
              return toast.error('subscription failed try again');
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default PaypalSubscriptionButtons;
