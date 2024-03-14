'use client';
import React, { useContext, useState } from 'react';
import { StateContext } from '../../../../context/StateProvider';
import PaypalCheckoutButtons from '../PaypalCheckoutButtons/PaypalCheckoutButtons';
import OrderConfirmButton from '../OrderConfirmButton/OrderConfirmButton';

const BillingPage = ({ session }) => {
  const {
    uploadedImages,
    perPhotoCost,
    photoType,
    imageQuantityFromUrl,
    taxRate,
    productDetailsDescription,
    fileUrl,
    orderName,
    returnTime,
    hasInstructions,
    photoRequirements,
    orderId,
  } = useContext(StateContext);

  const [showDetails, setShowDetails] = useState(false);
  const user = session?.user;

  console.log({ user });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('user data', user?.subscription?.plan_type);
  // const packageInfo = packages.find((pk) => pk.package_name === pack);
  const { plan_name, remaining_credit, price, photos, facilities } =
    user?.subscription || {};

  let totalPhotos =
    uploadedImages.length < 1 ? imageQuantityFromUrl : uploadedImages.length;
  let subTotal = totalPhotos * perPhotoCost;
  let taxTotal = (taxRate / 100) * subTotal;
  let grandTotal = subTotal + taxTotal;
  const remainingCredit = user?.subscription?.remaining_credit - totalPhotos;

  const orderDetails = {
    id: orderId,
    order_name: orderName,
    user_id: user.userId,
    photo_type: photoType,
    plan: user?.subscription?.plan_name,
    photo_quantity: parseInt(totalPhotos),
    per_photo_cost: perPhotoCost,
    subtotal: subTotal,
    tax_rate: taxRate,
    tax_total: taxTotal,
    grand_total: grandTotal,
    details: productDetailsDescription,
    file_url: fileUrl,
    requirements: photoRequirements,
    turn_around_time: returnTime,
    has_instruction: hasInstructions,
    // payment_method: paymentMethod,
  };

  let billPropertiesForPayAsGo = [
    { title: 'Total Photos', value: totalPhotos },
    { title: 'Order Name', value: orderName },
    {
      title: 'Plan',
      value: user?.subscription?.plan_name || plan_name,
    },
    {
      title: 'Price per product',
      value: '$' + parseFloat(perPhotoCost).toFixed(2),
    },
    { title: 'Turn Around Time', value: returnTime + ' Hours' },
    { title: 'subtotal', value: '$' + parseFloat(subTotal).toFixed(2) },
    { title: 'Tax', value: '$' + parseFloat(taxTotal).toFixed(2) },
    { title: 'Grand Total', value: '$' + parseFloat(grandTotal).toFixed(2) },
  ];

  let billPropertiesForCreditOrder = [
    { title: 'Order Name', value: orderName },
    { title: 'Total Photos', value: totalPhotos },
    { title: 'Photo Type', value: photoType },
    { title: 'Turn Around Time', value: returnTime + ' Hours' },
    {
      title: 'Plan',
      value: user?.subscription?.plan_name || plan_name,
    },

    { title: 'Remaining Credit', value: remaining_credit - totalPhotos },
  ];

  const billProperties =
    user?.subscription?.plan_type === 'pay-as-go'
      ? billPropertiesForPayAsGo
      : billPropertiesForCreditOrder;

  return (
    <div className='bg-white rounded p-5 '>
      {/* properties  */}
      <div
        className={`${
          user?.subscription?.plan_type !== 'pay-as-go'
            ? 'w-full lg:w-1/2 mx-auto '
            : 'border w-full lg:w-1/2 bg-red-500'
        }`}
      >
        <div>
          <div className='my-5'>
            <h3 className='font-bold text-xl mb-5'> Summary</h3>
            {billProperties.map((property, index) => (
              <div className='my-3' key={index}>
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

          {/* price section  */}
          <div className='flex items-center space-x-3 my-7'>
            <div>
              <p className='px-5 py-2.5 border rounded text-2xl '>$</p>
            </div>
            <div>
              <h3 className='text-xl font-bold'>
                <span className='mr-1'>$</span> {grandTotal.toFixed(2)}{' '}
                <span>USD</span>
              </h3>
              <p className='text-neutral'>Cost</p>
            </div>
          </div>

          {user?.subscription?.plan_type !== 'pay-as-go' && (
            <OrderConfirmButton
              user={user}
              agree={agree}
              setAgree={setAgree}
              orderDetails={orderDetails}
            />
          )}
        </div>
        {/* billing btn and process  */}{' '}
        <div>
          {user?.subscription?.plan_type === 'pay-as-go' && (
            <PaypalCheckoutButtons orderDetails={orderDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
