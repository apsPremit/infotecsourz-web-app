'use client';
import styles from '@/app/styles.module.css';
import React, { useContext, useState } from 'react';
import { StateContext } from '../../../../context/StateProvider';
import PaypalCheckoutButtons from '../PaypalCheckoutButtons/PaypalCheckoutButtons';
import OrderConfirmButton from '../OrderConfirmButton/OrderConfirmButton';
import Link from 'next/link';
import Image from 'next/image';
import paymentMethods from '../../../../../public/images/others/payment_methods.png';
import { useAuth } from '@/context/AuthProvider';
import { useSession } from 'next-auth/react';
import { useApplyCouponMutation } from '@/redux/services/couponApi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const BillingPage = () => {
  const router = useRouter();
  const {
    uploadedImageCount,
    perPhotoCost,
    photoType,
    imageQuantityFromUrl,
    taxRate,
    productDetailsDescription,
    fileUrl,
    imageSource,
    orderName,
    returnTime,
    instructionSource,
    photoRequirements,
    orderId,
    images,
  } = useContext(StateContext);
  const [coupon, setCoupon] = useState(null);
  const [isAppliedCoupon, setAppliedCoupon] = useState(false);
  const [applyCoupon] = useApplyCouponMutation();
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const { userData } = useAuth();
  const session = useSession();
  const user = session?.data?.user;
  const [agree, setAgree] = useState(false);

  const { plan_name, remaining_credit, price, photos, facilities } =
    userData?.subscription || {};

  let totalPhotos =
    uploadedImageCount < 1 ? imageQuantityFromUrl : images?.length;
  let subTotal = totalPhotos * perPhotoCost;
  let taxTotal = (taxRate / 100) * subTotal;
  let grandTotal = subTotal + taxTotal - discountAmount;

  const remainingCredit =
    userData?.subscription?.remaining_credit - totalPhotos;

  const orderDetails = {
    id: orderId,
    order_name: orderName,
    user_id: user?.userId,
    photo_type: photoType,
    plan: userData?.subscription?.plan_name,
    photo_quantity: parseInt(totalPhotos),
    per_photo_cost: perPhotoCost,
    subtotal: subTotal,
    tax_rate: taxRate,
    tax_total: taxTotal,
    grand_total: grandTotal,
    details: productDetailsDescription,
    image_url: fileUrl,
    image_source: imageSource,
    requirements: photoRequirements,
    turn_around_time: returnTime,
    instruction_source: instructionSource,
    source: 'web',
    discount_rate: discountRate,
  };

  let billPropertiesForPayAsGo = [
    { title: 'Total Photos', value: totalPhotos },
    { title: 'Order Name', value: orderName },
    {
      title: 'Plan',
      value: userData?.subscription?.plan_name || plan_name,
    },
    {
      title: 'Price per product',
      value: '$' + parseFloat(perPhotoCost).toFixed(2),
    },
    { title: 'Turn Around Time', value: returnTime + ' Hours' },
    { title: 'subtotal', value: '$' + parseFloat(subTotal).toFixed(2) },
    { title: 'Tax', value: '$' + parseFloat(taxTotal).toFixed(2) },
    {
      title: 'Discount',
      value: `${orderDetails?.discount_rate}%`,
    },
    {
      title: 'Grand Total',
      value: '$' + parseFloat(orderDetails?.grand_total).toFixed(2),
    },
  ];

  let billPropertiesForCreditOrder = [
    { title: 'Order Name', value: orderName },
    { title: 'Total Photos', value: totalPhotos },
    { title: 'Photo Type', value: photoType },
    { title: 'Turn Around Time', value: returnTime + ' Hours' },
    {
      title: 'Plan',
      value: userData?.subscription?.plan_name || plan_name,
    },

    { title: 'Remaining Credit', value: remaining_credit - totalPhotos },
  ];

  const billProperties =
    userData?.subscription?.plan_type === 'pay-as-go'
      ? billPropertiesForPayAsGo
      : billPropertiesForCreditOrder;

  const handleApplyCoupon = async () => {
    try {
      const response = await applyCoupon({ code: coupon, grandTotal }).unwrap();
      setDiscountAmount(response?.data?.discountAmount || 0);
      setDiscountRate(response?.data?.discountRate || 0);
      setAppliedCoupon(true);
      setPaymentMethod(null);

      toast.success('coupon applied successfully');
    } catch (error) {
      console.log('error', error);
      toast.error(error?.data?.message || 'something went wrong!');
    }
  };

  return (
    <div className='bg-white rounded p-5 '>
      {/* properties  */}
      <div
        className={`${
          userData?.subscription?.plan_type !== 'pay-as-go'
            ? 'w-full lg:w-1/2 mx-auto '
            : 'grid grid-cols-1 lg:grid-cols-2 gap-5 '
        } `}
      >
        <div className='border p-5 rounded-md shadow-md'>
          <div className=''>
            <h3 className='font-bold text-xl mb-5'> Summary</h3>
            {billProperties.map((property, index) => (
              <div className='my-3' key={index}>
                <div className='flex justify-between items-center '>
                  <h3 className='text-black'>
                    {property?.title}
                    {''}
                  </h3>
                  <h3>
                    {property?.value} {''}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <hr />

          {/* price section  */}
          <div className='flex items-center space-x-3 my-5'>
            <div>
              <p className='px-5 py-2.5 border rounded text-2xl '>$</p>
            </div>
            <div>
              <h3 className='text-xl font-bold'>
                <span className='mr-1'>$</span>{' '}
                {orderDetails?.grand_total.toFixed(2)} <span>USD</span>
              </h3>
              <p className='text-neutral'>Cost</p>
            </div>
          </div>

          {userData?.subscription?.plan_type !== 'pay-as-go' && (
            <OrderConfirmButton
              agree={agree}
              setAgree={setAgree}
              orderDetails={orderDetails}
            />
          )}
        </div>
        {/* fight side  */}
        {/* billing btn and process  */}
        {/* when subscription plan is pay as to the execute this code */}

        <div>
          {userData?.subscription?.plan_type === 'pay-as-go' && (
            <div className='p-5 border rounded-md shadow-md'>
              <h3 className='text-xl font-bold mb-5'>Billing</h3>

              <div className=''>
                <label htmlFor='' className=''>
                  Coupon
                </label>
                <br />
                <div className='w-full flex gap-5 items-center mt-1.5'>
                  <input
                    type='text'
                    onChange={(e) => setCoupon(e.target.value)}
                    className='py-1.5 px-2 border rounded w-full'
                  />
                  <button
                    disabled={isAppliedCoupon}
                    onClick={handleApplyCoupon}
                    className='px-3 py-1.5 text-white bg-main hover:bg-mainHover rounded disabled:bg-violet-200 '
                  >
                    Apply
                  </button>
                </div>
              </div>

              <p className='mt-5 mb-2'>Select Payment method</p>
              <div className=''>
                <label
                  htmlFor='paypal_credit'
                  className='border px-3 py-2 rounded grid grid-cols-2 items-center courser-pointer mb-5'
                >
                  <div className='flex items-center gap-2 font-bold'>
                    <input
                      onClick={(e) => {
                        setPaymentMethod(
                          paymentMethod === e.target.value
                            ? null
                            : e.target.value
                        );
                        setAgree(!agree);
                      }}
                      value='paypal / credit card'
                      id='paypal_credit'
                      type='radio'
                      className='accent-main w-4 h-4'
                      checked={paymentMethod === 'paypal / credit card'}
                    />
                    <p className='whitespace-nowrap'>Paypal / Credit Card</p>
                  </div>
                  <Image
                    alt='payment methods'
                    src={paymentMethods}
                    width={200}
                  />
                </label>
              </div>

              <div>
                <label
                  htmlFor='agree_terms'
                  className='flex items-start gap-x-4 px-2 mt-3 cursor-pointer'
                >
                  <input
                    checked={paymentMethod === 'paypal / credit card'}
                    id='agree_terms'
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

              <div>
                {paymentMethod === 'paypal / credit card' && (
                  <div className='mt-8 '>
                    <PaypalCheckoutButtons
                      orderDetails={orderDetails}
                      userData={userData}
                      agree={agree}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='my-5 flex justify-end'>
        <button onClick={() => router.back()} className={styles.btn_shadow}>
          Back
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default BillingPage;
