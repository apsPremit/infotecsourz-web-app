import config from '@/config';
import useUpdateSession from '@/hook/useUpdateSession';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const OrderConfirmButton = ({ agree, setAgree, orderDetails, user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateSession } = useUpdateSession();
  const confirmOrder = async (data) => {
    console.log({ data });
    try {
      setLoading(true);
      const response = await fetch(
        `${config.api_base_url}/orders/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        updateSession(result.data);
      }
      setLoading(false);
      if (!result.success) {
        throw new Error(result.message);
      }
      router.push(
        `/order_success?orderId=${result?.data?.id}&&message=order placed successfully`
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log('order error', error);
    }
  };
  return (
    <div>
      <label
        htmlFor='agree_terms'
        className='flex items-start gap-x-4 px-2 my-5 cursor-pointer'
      >
        <input
          onChange={() => setAgree(!agree)}
          id='agree_terms'
          checked={agree}
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
            Terms
          </Link>
          <span className='px-2'>&</span>
          <Link
            target='_blank'
            className='text-main hover:underline me-3'
            href=' https://www.infotecsourz.com/privacy-policy/'
          >
            Privacy Policy
          </Link>
        </p>
      </label>
      <button
        // disabled={!agree || loading}
        onClick={() => confirmOrder(orderDetails)}
        className='w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer'
      >
        {loading ? 'Processing...' : ' Confirm Order'}
      </button>
      <Toaster />
    </div>
  );
};

export default OrderConfirmButton;
