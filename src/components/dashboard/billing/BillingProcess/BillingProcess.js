'use client';
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const BillingProcess = ({
  subTotal,
  perPhotoCost,
  grandTotal,
  taxTotal,
  remainingCredit,
  totalPhotos,
}) => {
  const router = useRouter();
  const [isAgree, setAgree] = useState(false);
  const { userData } = UserAuth() || {};
  const [processing, setProcessing] = useState(false);

  const {
    uploadedImages,
    photoType,
    selectedPackage,
    orderId,
    productDetailsDescription,
    fileUrl,
    photoRequirements,
    orderName,
    taxRate,
    returnTime,
    hasInstructions,
    paymentMethod,
    setOrderDetails,
  } = useContext(StateContext);

  const orderDetails = {
    orderId: orderId,
    orderName: orderName,
    name: userData?.name,
    email: userData?.email,
    country: userData.country,
    photoType,
    package: selectedPackage?.package_name || userData?.subscribedPackage,
    photoQuantity: parseInt(totalPhotos),
    perPhotoCost,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    productDetailsDescription,
    fileUrl,
    photoRequirements,
    returnTime,
    hasInstructions: hasInstructions,
    paymentMethod,
  };

  const placeOrder = async () => {
    setProcessing(true);
    const orderData = { ...orderDetails, paymentStatus: 'paid' };
    try {
      const res = await fetch(`${baseUrl}/order`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          paymentDetails: userData?.paymentDetails || {},
        }),
      });

      if (!res.ok) {
        setProcessing(false);
        console.log(res.statusText);
        throw new Error('something went wrong');
      }
      setProcessing(false);
      router.push(`/order_success?orderId=${orderData?.orderId}`);
    } catch (error) {
      console.log('error', error);
      setProcessing(false);
      Swal.fire({
        title: 'something went wrong ',
        icon: 'error',
      });
    }
  };

  const showModal = () => {
    Swal.fire({
      icon: 'error',
      title: 'You have not require credit',
      html: `<p>You don't have enough credit. Please upgrade plan.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Upgrade Plan',
    }).then(async (result) => {
      if (result.isConfirmed) {
        router.push('/dashboard/pricing?callback=/dashboard/billing');
      }
    });
  };

  const confirmOrder = async () => {
    const pack = orderDetails.package;
    if (pack === 'pay as go') {
      setOrderDetails(orderDetails);
      return router.push(
        `/dashboard/billing/payment?p=${orderDetails?.grandTotal}`
      );
    } else {
      if (orderDetails?.photoQuantity > userData?.remainingCredit) {
        showModal();
      } else {
        await placeOrder();
      }
    }
  };

  return (
    <div>
      <button
        disabled={!isAgree || processing}
        onClick={confirmOrder}
        className='w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-center text-lg text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-300'
      >
        {processing ? 'Processing...' : ' ConfirmOrder'}
      </button>

      {/* terms and conditions */}
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
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <Toaster />
    </div>
  );
};

export default BillingProcess;
