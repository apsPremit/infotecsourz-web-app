'use client';
import config from '@/config';
import { useAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { headers } from '../../../../../next.config';

const SpecificationsLeftSide = () => {
  const {
    orderName,
    uploadedImages,
    imageQuantityFromUrl,
    setReturnTime,
    returnTime,
  } = useContext(StateContext);

  const { userData } = useAuth();
  console.log({ userData });
  const session = useSession();
  const accessToken = session?.data?.user?.accessToken;
  const [plan, setPlan] = useState(null);
  console.log(plan);
  const planId = userData?.subscription.plan_id;
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `${config.api_base_url}/plans/${planId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const result = await response.data;
        console.log(result);
        setPlan(result.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchPlan();
  }, [planId, accessToken]);

  const fields = [
    { label: 'Order Name', value: orderName, type: 'text' },

    {
      label: 'Product Uploaded',
      value:
        imageQuantityFromUrl > 0 ? imageQuantityFromUrl : uploadedImages.length,
      type: 'text',
    },
    {
      label: 'Created',
      value: moment(new Date()).format('MMM Do YY'),
      type: 'text',
    },
  ];
  const returnTimeOptions = [
    { label: 'Select return time', value: 0, cost: 0 },

    // { label: '12 Hours', value: 12, cost: 1 },
    // { label: '24 Hours', value: 24, cost: 0.8 },
    // { label: '48 Hours', value: 48, cost: 0.5 },
    // { label: '72 Hours', value: 72, cost: 0 },
  ];
  const handleReturnTime = (e) => {
    setReturnTime(parseInt(e.target.value));
  };

  return (
    <div>
      <div>
        <h3 className='mb-3 text-xl font-bold'>Review Order</h3>
        <p className=''>
          Check your order details that you’ve uploaded. Make sure all details
          are perfect.
        </p>
      </div>
      <div className='mt-8'>
        {fields.map((field, index) => (
          <div className='my-3' key={index}>
            <label>
              <span className='mb-4 ml-1 text-sm text-black'>
                {field?.label}
              </span>
              <input
                type={field?.type}
                value={field?.value}
                className='w-full cursor-not-allowed rounded border border-shadow px-3 py-1.5  outline-0 focus:rounded focus:border-main'
                disabled
              />
            </label>
          </div>
        ))}
        <label>
          <span className='mb-1 ml-1 mt-4 block text-sm text-black'>
            Select Turn Around Time
            <span className='text-red-500'>*</span>
          </span>
          <select
            onChange={handleReturnTime}
            name=''
            id=''
            className='w-full rounded border border-shadow px-3 py-1.5 '
          >
            <option value=''>Select turn around time</option>
            {plan?.turn_around_time?.map((item, index) => (
              <option key={index} value={item}>
                {`${item} Hours`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default SpecificationsLeftSide;
