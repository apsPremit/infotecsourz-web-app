'use client';
import React, { useContext, useState } from 'react';
import { StateContext } from '@/context/StateProvider';
import { UserAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/utils/functions/baseUrl';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Swal from 'sweetalert2';
import subscribeFreeTrial from '@/utils/functions/subscribeFreeTrial';

const PricingBilling = ({ pack }) => {
  const { taxRate, setOrderDetails } = useContext(StateContext);
  const [isAgree, setAgree] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const { userData } = UserAuth();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const router = useRouter();
  const { package_name, price, photos, validity } = pack || {};

  let subTotal = price;
  let taxTotal = (price / 100) * taxRate;
  let grandTotal = subTotal + taxTotal;

  let billProperties = [
    { title: 'Package Name', value: package_name },
    { title: 'Package Credit', value: photos },
    { title: 'Package Price', value: '$' + price },
    { title: 'Subtotal', value: '$' + subTotal },
    { title: 'Tax', value: '$' + taxTotal },
    { title: 'GrandTotal', value: '$' + grandTotal },
  ];

  const randomNum = Math.floor(Math.random() * 100000000);
  const randomString = String(randomNum).padStart(8, '0');

  const orderDetails = {
    orderId: randomString,
    orderName: `subscription for ${package_name} package`,
    name: userData?.name,
    email: userData?.email,
    package: package_name,
    validity,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    credit: photos,
    country: userData?.country || '',
    paymentMethod,
    paymentStatus: 'paid',
    status: 'approved',
  };

  // const conformFreeTrial = async () => {};

  const confirmOrder = async () => {
    if (pack?.package_name == 'free trial') {
      setProcessing(true);
      const freeTrialResult = await subscribeFreeTrial(orderDetails);
      if (freeTrialResult.success) {
        setProcessing(false);
        return router.push(
          `/order_success?orderId=${freeTrialResult?.data?.orderId}&message=Subscription Successful`
        );
      }
      setProcessing(false);
      return;
    }
    setOrderDetails(orderDetails);
    router.push(`/dashboard/pricing/billing/payment?p=${price}`);
  };

  return (
    <div className=' mx-auto mt-10 w-full  rounded p-5  md:w-3/4 lg:w-1/2 lg:p-10'>
      {/* right side  */}
      <div className='bg-white p-10'>
        <h3 className='mb-5 text-xl font-bold'>Summary</h3>

        {/* properties  */}
        <div className='my-5 '>
          {billProperties.map((property, index) => (
            <div className='my-3 ' key={index}>
              <div className='flex items-center justify-between '>
                <h3 className='text-[#ADACB0]'>{property?.title}</h3>
                <h3>{property?.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <hr />

        <div className='my-7 flex items-center space-x-3'>
          <div>
            <p className='rounded border px-5 py-2.5 text-2xl '>$</p>
          </div>
          <div>
            <h3 className='text-xl font-bold'>
              <span className='mr-1'>$</span> {grandTotal?.toFixed(2)}{' '}
              <span>USD</span>
            </h3>
            <p className='text-neutral'>Cost</p>
          </div>
        </div>

        {/* billing btn and process  */}
        <div>
          {/* <Link href={`/dashboard/pricing/billing/payment?p=${price}`}> */}
          <button
            disabled={!isAgree || isProcessing}
            onClick={confirmOrder}
            className='w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-center text-lg text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-300'
          >
            {isProcessing ? 'Processing...' : 'Checkout'}
          </button>
          {/* </Link> */}
          <label
            htmlFor='agree_terms'
            className='mt-3 flex cursor-pointer items-start gap-x-4 px-2'
          >
            <input
              onChange={() => setAgree(!isAgree)}
              id='agree_terms'
              checked={isAgree}
              type='checkbox'
              className='mt-1 scale-125'
            />
            <p className='text-sm'>
              I accept{' '}
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

export default PricingBilling;
