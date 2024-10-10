'use client';
import config from '@/config';
import { baseUrl } from '@/utils/functions/baseUrl';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { RxDotFilled } from 'react-icons/rx';

const OrderRow = ({ order }) => {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  const [downloading, setDownloading] = useState({ type: null, id: null });
  const {
    _id,
    id,
    order_name,
    status,
    createdAt,
    turn_around_time,
    paymentStatus,
    delivered_file_url,
  } = order || {};

  const handleDownload = (url, fileName, id, type = 'order') => {
    setDownloading({ type, id });
    axios
      .get(url, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('download', fileName);
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
        setDownloading({ type: null, id: null });
      })
      .catch((error) => {
        alert('did not find any files');
        setDownloading({ type: null, id: null });
      });
  };

  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4 text-sm  text-blue-500 '>
        {id}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm  text-blue-500 '>
        {order_name}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black '>
        {status === 'delivered' &&
          (delivered_file_url ? (
            <Link target='_blank' to={delivered_file_url}>
              <button className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'>
                Download
              </button>
            </Link>
          ) : (
            <button
              onClick={() =>
                handleDownload(
                  `${config.api_base_url}/images/download?orderId=${id}`,
                  `${id}.zip`,
                  id
                )
              }
              className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'
            >
              {downloading.type == 'order' && downloading.id === id ? (
                <span className='flex items-center justify-center  text-xs text-white'>
                  Downloading
                  <ImSpinner2 className='animate-spin ml-2 text-white' />
                </span>
              ) : (
                'Download'
              )}
            </button>
          ))}
      </td>

      <td className='whitespace-nowrap px-6 py-4 text-sm     '>
        <span
          className={`flex items-center p-1  ${
            status === 'denied'
              ? 'bg-red-100 text-red-500'
              : status == 'in-revision'
                ? 'bg-pink-100  text-pink-500'
                : 'bg-green-100 text-green-500'
          }`}
        >
          <span className=' text-xl '>
            <RxDotFilled />
          </span>
          <span className=''>{status}</span>
        </span>
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        {moment(createdAt).format('MM DD YY, h:mm a')}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        {turn_around_time && turn_around_time + ' Hours'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        <Link href={`/dashboard/order/${id}`} className='hover:underline'>
          View
        </Link>
      </td>

      <td className='whitespace-nowrap px-6 py-4 text-sm text-black text-center '>
        {order?.revision ? (
          order.revision.status === 'pending' ? (
            <p>Request Sent</p>
          ) : order.revision.resolved_image_source ? (
            <button
              onClick={() =>
                handleDownload(
                  `${config.api_base_url}/revisions/${order?.revision?.id}/download-image`,
                  `revision_${id}.zip`,
                  order?.revision?.id,
                  'revision'
                )
              }
              className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'
            >
              {downloading.type == 'revision' &&
              downloading.id === order?.revision?.id ? (
                <span className='flex items-center justify-center  text-xs text-white'>
                  Downloading
                  <ImSpinner2 className='animate-spin ml-2 text-white' />
                </span>
              ) : (
                'Download'
              )}
            </button>
          ) : null // Handle other statuses if needed
        ) : order?.status === 'delivered' ? (
          <Link className='underline' href={`/dashboard/revision/${id}`}>
            Send Request
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default OrderRow;
