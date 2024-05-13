'use client';
import { StateContext } from '../../../../context/StateProvider';
import React, { useContext, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import PricingTable from '../../../shared/PricingTable/PricingTable';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';

const SinglePackage = ({ plan }) => {
  const { setSelectedPackage, selectedPackage } = useContext(StateContext);
  const [isShowPricingModal, setShowPricingModal] = useState(false);
  const router = useRouter();
  const { userData } = useAuth();
  const params = useSearchParams();
  const callback = params.get('callback');
  const [showDetails, setShowDetails] = useState(false);
  const handleNavigation = (plan) => {
    if (plan?.type !== 'paid') {
      return router.push(`/dashboard/pricing/no-payment?plan=${plan?.id}`);
    }
    Swal.fire({
      title: 'Are you sure for subscribe this package?',
      text: `your previous subscription will be cancel`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/dashboard/pricing/billing?plan=${plan?.id}`);
      }
    });
  };

  const getPerCost = (price, photos) => {
    const perPhotCost = price / photos;
    return perPhotCost.toFixed(2);
  };

  const {
    id,
    plan_name,
    price,
    credit,
    spec,
    facilities,
    free_credit,
    type,
    validity,
    bill_type,
  } = plan || {};
  return (
    <>
      <div className={`border-shadow rounded   p-5 shadow relative bg-white`}>
        <label className='cursor-pointer ' htmlFor={plan_name}>
          <div className='min-h-[52px]'>
            <h1 className='font-bold text-2xl capitalize'>{plan_name}</h1>
            {price > 0 && (
              <h3 className='font-bold'>
                ${price}
                {bill_type && (
                  <span className=''>
                    /{bill_type === 'custom' ? validity + 'Days' : bill_type}
                  </span>
                )}
              </h3>
            )}
            {free_credit > 0 && (
              <h3 className='font-bold'>
                {free_credit} <span>Credit</span>
              </h3>
            )}
            {type === 'pay-as-go' && (
              <h3 className='font-bold'>$0.39 to $6.59/photo</h3>
            )}
          </div>

          <hr className='my-3' />

          <div className='min-h-[150px]'>
            <ul className='mb-3'>
              {spec?.map((sp, index) => (
                <li className='list-inside list-disc' key={index}>
                  {sp}
                </li>
              ))}
              {credit > 0 && (
                <li className='list-inside list-disc'>{credit} Credits</li>
              )}
              {credit > 0 && (
                <li className='list-inside list-disc'>{credit} Photos</li>
              )}
              {credit === 0 && (
                <li className='list-inside list-disc'>Unlimited Credits</li>
              )}
              {credit === 0 && (
                <li className='list-inside list-disc'>Unlimited Photos</li>
              )}
              {validity > 0 && (
                <li className='list-inside list-disc'>
                  {validity} days validity
                </li>
              )}
              {/* {validity == 0 && (
                <li className="list-inside list-disc">Unlimited validity</li>
              )} */}
              {credit > 0 && (
                <li className='list-inside list-disc'>
                  ${getPerCost(price, credit)} price per photo
                </li>
              )}
              {type === 'pay-as-go' && (
                <li className='list-inside list-disc'>
                  $0.39 to $6.59 per photo
                </li>
              )}
            </ul>

            {/* details  */}
            <div>
              <div className='flex b flex-col'>
                <div className='flex justify-start'>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className='text-blue-500 underline'
                  >
                    More Features
                  </button>
                </div>
                <div className={`${showDetails ? '' : 'hidden'}`}>
                  <ul className='list-inside list-disc'>
                    {facilities?.map((item, i) => (
                      <p key={i} className='gap-x-2 flex items-center my-5'>
                        <span className='text-sm'>
                          {' '}
                          <IoMdCheckmark color={'green'} />
                        </span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {type === 'pay-as-go' && (
              <button
                onClick={() => setShowPricingModal(true)}
                className='gap-x-2 flex items-center my-2 text-main  underline outline-0 border-0'
              >
                About Pricing
              </button>
            )}
          </div>

          <div>
            {id === userData?.subscription?.plan_id ? (
              <div className=' relative  flex justify-center'>
                <div className='w-full flex flex-col'>
                  <Link
                    className='text-sm space-y-2 hover:text-main'
                    href={`/dashboard/buy-credit?plan=${id}`}
                  >
                    Buy Credit
                  </Link>
                  <label htmlFor='' className='group flex flex-col'>
                    <button
                      disabled
                      className=' py-2 mt-2 px-3.5 text-white bg-mainHover rounded w-full  '
                    >
                      Current Plan
                    </button>
                    <span className='absolute -top-10 scale-0 transition-all rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100'>
                      You already have this plan. Choose another plan.
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className='group relative  flex justify-center'>
                <button
                  disabled={
                    plan_name === 'free trial' &&
                    userData?.able_free_trial === false
                  }
                  onClick={() => handleNavigation(plan)}
                  className={`${
                    selectedPackage.plan_name === plan_name
                      ? 'bg-green-500 hover:bg-green-600 rounded w-full disabled:bg-green-200'
                      : 'bg-blue-500 hover:bg-blue-600 rounded w-full disabled:bg-blue-200'
                  } py-2 mt-2 my-5 px-3.5 text-white `}
                >
                  {type == 'free' ? 'Start Free Trial' : 'Subscribe'}
                </button>
                {type === 'pay-as-go' && (
                  <span className='absolute -top-10 scale-0 transition-all rounded bg-slate-500 p-2 text-xs text-white group-hover:scale-100'>
                    Charge depends on your retouching needs.
                  </span>
                )}
                {type === 'free' && userData?.able_free_trial === false && (
                  <span className='absolute -top-10 scale-0 transition-all rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100'>
                    You already used free trial
                  </span>
                )}
              </div>
            )}
          </div>
        </label>
      </div>
      <PricingTable
        isShowPricingModal={isShowPricingModal}
        setShowPricingModal={setShowPricingModal}
      />
    </>
  );
};

export default SinglePackage;
