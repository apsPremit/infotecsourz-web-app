'use client';
import React, { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import paymentMethods from '../../../../../public/images/others/payment_methods.png';
import Swal from 'sweetalert2';
import { StateContext } from '@/context/StateProvider';
import PaypalSubscriptionButtons from './PaypalSubscription.buttons';
import { useSession } from 'next-auth/react';
const PricingBilling = ({ plan }) => {
  const { taxRate, isTermsAgreed, setIsTermsAgreed } = useContext(StateContext);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal / credit card');
  const { data: session, update } = useSession();
  const user = session?.user;

  const { plan_name, price, credit, facilities, validity, plan_id } =
    plan || {};

  let subTotal = price;
  let taxTotal = (price / 100) * taxRate;
  let grandTotal = subTotal + taxTotal;

  let billProperties = [
    { title: 'Package Name', value: plan_name },
    { title: 'Package Credit', value: credit },
    { title: 'Photos', value: credit },
    { title: 'Package Price', value: '$' + price },
    { title: 'Subtotal', value: '$' + subTotal },
    { title: 'GrandTotal', value: '$' + grandTotal },
  ];
  const createOrderId = () => {
    const randomNum = Math.floor(Math.random() * 100000000);
    const randomString = String(randomNum).padStart(8, '0');
    return randomString;
  };
  const orderDetails = {
    orderId: createOrderId(),
    orderName: `subscription for ${plan_name} package`,
    name: user?.name,
    email: user?.email,
    package: plan_name,
    validity,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    credit: credit,
    country: user?.country || '',
    paymentMethod,
    paymentStatus: 'unpaid',
  };

  const updateSession = async (newSubscription) => {
    await update({
      ...session,
      user: {
        ...session.user,
        subscription: newSubscription,
      },
    });
  };

  return (
    <div className=' rounded p-5   mt-10 w-full  '>
      <div className=' p-5 lg:p-10 rounded bg-white'>
        {/* left side  */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='bg-white p-5 rounded-lg shadow-lg border'>
            {/* <h3 className="font-bold text-xl mb-3">
              You’re almost there! Complete your order
            </h3> */}
            <h3 className='font-bold text-xl mb-5'>Subscription Summary</h3>

            {/* properties  */}
            <div className='my-5 '>
              {billProperties.map((property, index) => (
                <div className='my-3 ' key={index}>
                  <div className='flex justify-between items-center '>
                    <h3 className='text-[#ADACB0]'>{property?.title}</h3>
                    <h3>{property?.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Details  */}
            <div className='flex  flex-col'>
              <div className='flex justify-end'>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className='text-main underline'
                >
                  More Details
                </button>
              </div>
              <div className={`${showDetails ? '' : 'hidden'}`}>
                <ul className='list-inside list-disc'>
                  {facilities?.map((item, i) => (
                    <li className='' key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />

            <div className='flex items-center space-x-3 my-7'>
              <div>
                <p className='px-5 py-2.5 border rounded text-2xl '>$</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>
                  <span className='mr-1'>$</span> {subTotal?.toFixed(2)}{' '}
                  <span>USD</span>
                </h3>
                <p className='text-neutral'>Cost</p>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className='bg-white p-5 rounded-lg shadow-lg border'>
            <p className='text-xl font-bold'>Billing</p>
            <p className='mt-5 mb-2'>Select Payment method</p>
            <div className=''>
              <label
                htmlFor='paypal_credit'
                className='border px-3 py-2 rounded grid grid-cols-2 items-center courser-pointer mb-5'
              >
                <div className='flex items-center gap-2 font-bold'>
                  <input
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value='paypal / credit card'
                    id='paypal_credit'
                    type='radio'
                    className='accent-main w-4 h-4'
                    checked={paymentMethod === 'paypal / credit card'}
                  />
                  <p className='whitespace-nowrap'>Paypal / Credit Card</p>
                </div>
                <Image alt='payment methods' src={paymentMethods} width={200} />
              </label>
            </div>

            {/* terms  */}
            <div>
              <label
                htmlFor='agree_terms'
                className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'
              >
                <input
                  onChange={() => setIsTermsAgreed(!isTermsAgreed)}
                  id='agree_terms'
                  checked={isTermsAgreed}
                  type='checkbox'
                  className='scale-125 mt-1'
                />
                <p className='text-sm'>
                  I accept{' '}
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
                    href='https://www.infotecsourz.com/terms-and-conditions/'
                    className='text-main hover:underline'
                  >
                    Privacy policy
                  </Link>
                </p>
              </label>
            </div>

            {/* paypal payment  */}

            <div className='my-10 '>
              <PaypalSubscriptionButtons plan_id={plan_id} user={user} />
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default PricingBilling;
