import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import config from '@/config';
import { baseUrl } from '@/utils/functions/baseUrl';
import moment from 'moment';
import { getServerSession } from 'next-auth';
import React from 'react';

const fetchOrder = async (orderId, accessToken) => {
  try {
    const res = await fetch(`${config.api_base_url}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {}
};

const OrderDetails = async ({ params }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  const orderInfo = await fetchOrder(id, session?.user?.accessToken);

  const {
    orderName,
    _id,
    orderId,
    name,
    email,
    status,
    photoType,
    package: packageName,
    photoQuantity,
    perPhotoCost,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    remainingCredit,
    productDetailsDescription,
    createdAt,
    returnTime,
    paymentStatus,
    invoiceStatus,
    country,
    deliveredFileUrl,
    photoRequirements,
    fileUrl,
    paymentMethod,
    transactionId,
  } = orderInfo || {};

  const { formats, additional, backgroundColor } =
    orderInfo.photoRequirements || {};

  return (
    <div>
      <div className='bg-white p-7'>
        {/* <div className="flex justify-between items-center mb-3 pt-5">
          <h1 className="font-bold text-lg mb-5">Order Details </h1>
          <button
            onClick={generatePdf}
            className="bg-main px-2 py-1.5 text-white rounded "
          >
            Download PDF
          </button>
        </div> */}

        <div className=''>
          <div className='rounded border p-5'>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Order id</p>
              <p>{orderId}</p>
            </div>

            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Order name</p>
              <p>{orderName}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Status</p>
              <p>{status}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Created Data</p>
              <p>{moment(createdAt).format('MMM Do YY')}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Turn around time</p>
              <p>{returnTime} Hours</p>
            </div>
            {/* <div className="flex justify-between mb-2 border-b">
              <p className="text-main">Remaining Time</p>
              <p>dsfd</p>
            </div> */}
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Photo Type</p>
              <p>{photoType}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'> Package</p>
              <p>{packageName}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Photo Quantity</p>
              <p>{photoQuantity}</p>
            </div>
            {fileUrl && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>fileUrl</p>
                <p>{fileUrl}</p>
              </div>
            )}

            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Formats</p>
              <p>
                {formats?.map((requirement, index) => (
                  <span key={index}>{requirement}, </span>
                ))}
              </p>
            </div>

            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>BackgroundColor</p>
              <p>{backgroundColor}</p>
            </div>
            {additional && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>Additional</p>
                <p className='whitespace-pre-wrap'>
                  {additional?.map((adi, index) => (
                    <span key={index}> {adi}, </span>
                  ))}
                </p>
              </div>
            )}

            {paymentMethod && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>Payment Method</p>
                <p>{paymentMethod}</p>
              </div>
            )}
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Payment Status</p>
              <p>{paymentStatus}</p>
            </div>
            {transactionId && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>TransactionId</p>
                <p>{transactionId}</p>
              </div>
            )}
          </div>

          {/* customer details  */}
          <div className='mt-10 rounded border p-5'>
            <h3 className='font-bold '>Customer Details</h3>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Name</p>
              <p>{name}</p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Email</p>
              <p>{email}</p>
            </div>
            {country && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>Country</p>
                <p>{country}</p>
              </div>
            )}

            <h3 className='my-5 font-bold'>Price Details</h3>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Subtotal</p>
              <p>${subTotal?.toFixed(2)}</p>
            </div>
            {grandTotal > 0 && (
              <div className='mb-2 flex justify-between border-b'>
                <p className='text-main'>Tax rate</p>
                <p>${taxRate} </p>
              </div>
            )}
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Total Tax</p>
              <p>${taxTotal?.toFixed(2)} </p>
            </div>
            <div className='mb-2 flex justify-between border-b'>
              <p className='text-main'>Grand total</p>
              <p>${grandTotal?.toFixed(2)} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
