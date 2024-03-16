import React from 'react';
import moment from 'moment';
import config from '@/config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const fetchOrder = async (orderId, accessToken) => {
  try {
    const res = await fetch(`${config.api_base_url}/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.log('order details', error);
  }
};

const OrderDetails = async ({ params }) => {
  const orderId = params.id;
  const session = await getServerSession(authOptions);
  const orderInfo = await fetchOrder(orderId, session?.user.accessToken);
  const {
    order_name,
    _id,
    id,
    status,
    photo_type,
    plan_name,
    photo_quantity,
    per_photo_cost,
    details,
    createdAt,
    turn_around_time,
    paymentStatus,
    invoiceStatus,
    country,
    delivered_file_url,
    requirements,
    file_url,
    payment_method,
    tranSaction_id,
  } = orderInfo || {};

  const { formats, additional, background_color } =
    orderInfo.requirements || {};

  const { name, email } = orderInfo?.user || {};
  const { subtotal, tax_rate, total_amount, tax_total } =
    orderInfo?.transaction || {};

  return (
    <div>
      <div className=''>
        <div className='p-5 border rounded bg-white'>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Order id</p>
            <p>{orderId}</p>
          </div>

          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Order name</p>
            <p>{order_name}</p>
          </div>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Status</p>
            <p>{status}</p>
          </div>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Created Data</p>
            <p>{moment(createdAt).format('MMM Do YY')}</p>
          </div>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Turn around time</p>
            <p>{turn_around_time} Hours</p>
          </div>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Photo Type</p>
            <p>{photo_type}</p>
          </div>

          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Photo Quantity</p>
            <p>{photo_quantity}</p>
          </div>
          {file_url && (
            <div className='flex justify-between mb-2 border-b'>
              <p className='text-main'>fileUrl</p>
              <p>{file_url}</p>
            </div>
          )}

          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Formats</p>
            <p>
              {formats?.map((requirement, index) => (
                <span key={index}>{requirement}, </span>
              ))}
            </p>
          </div>

          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>BackgroundColor</p>
            <p>{background_color}</p>
          </div>
          {additional && (
            <div className='flex justify-between mb-2 border-b'>
              <p className='text-main'>Additional</p>
              <p className='whitespace-pre-wrap'>
                {additional?.map((adi, index) => (
                  <span key={index}> {adi}, </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {/* customer details  */}
        <div className='p-5 border rounded mt-10 bg-white'>
          <h3 className='font-bold '>Customer Details</h3>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Name</p>
            <p>{name}</p>
          </div>
          <div className='flex justify-between mb-2 border-b'>
            <p className='text-main'>Email</p>
            <p>{email}</p>
          </div>

          {/* transaction information  */}
          {orderInfo.transaction && (
            <div>
              <h3 className='font-bold my-5'>Price Details</h3>
              <div className='flex justify-between mb-2 border-b'>
                <p className='text-main'>Subtotal</p>
                <p>${subtotal?.toFixed(2)}</p>
              </div>
              {tax_rate > 0 && (
                <div className='flex justify-between mb-2 border-b'>
                  <p className='text-main'>Tax rate</p>
                  <p>${tax_rate} </p>
                </div>
              )}
              <div className='flex justify-between mb-2 border-b'>
                <p className='text-main'>Total Tax</p>
                <p>${tax_total?.toFixed(2)} </p>
              </div>
              <div className='flex justify-between mb-2 border-b'>
                <p className='text-main'>Grand total</p>
                <p>${total_amount?.toFixed(2)} </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
