'use client';
import { baseUrl } from '@/utils/functions/baseUrl';
import axios from 'axios';
import moment from 'moment';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { RxDotFilled } from 'react-icons/rx';

const OrderRow = ({ order }) => {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
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

  const bucketName = process.env.NEXT_PUBLIC_ADMIN_UPLOAD_IMAGE_BUCKET;

  const handleDownload = () => {
    setDownloading(true);
    axios
      .get(`${baseUrl}/image?bucketName=${bucketName}&folderName=${id}`, {
        responseType: 'blob',
      })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('download', `${id}.zip`);
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      })
      .catch((error) => {
        console.log('download error', error);
        alert('did not find any files');
        setDownloading(false);
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
        {status == 'delivered' ||
          (status == 'in-revision' &&
            (delivered_file_url ? (
              <Link target='_blank' href={delivered_file_url}>
                <button className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'>
                  Download
                </button>
              </Link>
            ) : (
              <button
                onClick={handleDownload}
                className='text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded'
              >
                {downloading ? (
                  <span className='flex items-center justify-center  text-xs text-white'>
                    Downloading
                    <ImSpinner2 className='animate-spin ml-2 text-white' />
                  </span>
                ) : (
                  'Download'
                )}
              </button>
            )))}
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
        {moment(createdAt).format('MMM Do YY, h:mm:ss a')}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        {turn_around_time && turn_around_time + ' Hours'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        <Link href={`/dashboard/order/${id}`} className='hover:underline'>
          View
        </Link>
      </td>

      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black text-center '>
        {status == 'in-revision' ? (
          <p>Request Sent</p>
        ) : status == 'delivered' ? (
          <Link className='underline' href={`/dashboard/revision/${id}`}>
            Send Request
          </Link>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
