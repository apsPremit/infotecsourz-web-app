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

const SupportRow = ({ support }) => {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const { ticket, subject, status, createdAt, description } = support || {};
  const truncateDescription = (description) => {
    if (description.length > 20) {
      return description?.slice(0, 20) + '...';
    }
    return description;
  };
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4 text-sm  text-blue-500 '>
        {ticket}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm  text-blue-500 '>
        {subject}
      </td>

      <td title={description} className='whitespace-nowrap px-6 py-4 text-sm '>
        {truncateDescription(description)}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        {status}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm   text-black  '>
        {moment(createdAt).format('MMM Do YY')}
      </td>
    </tr>
  );
};

export default SupportRow;
