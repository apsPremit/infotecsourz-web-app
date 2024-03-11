'use client';
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import React, { useContext, useEffect, useState } from 'react';
import BillingProcess from '../BillingProcess/BillingProcess';
import { baseUrl } from '@/utils/functions/baseUrl';
// import BillingProcess from "../BillingProcess/BillingProcess";
// import { StateContext } from "../../../../context/StateProvider";
// import { UserAuth } from "../../../../context/AuthProvider";
// import { packages } from "../../../../utils/json/packagePlan";

const BillingRightSide = () => {
  const {
    uploadedImages,
    perPhotoCost,
    photoType,
    imageQuantityFromUrl,
    taxRate,
    selectedPackage,
    updatedCredit,
    orderName,
    returnTime,
  } = useContext(StateContext);

  const [packageInfo, setPackageInfo] = useState({});
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/package/single/${
            selectedPackage?.package_name || userData?.subscribedPackage
          }`
        );
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const result = await res.json();
        console.log('single pack', result.data);

        setPackageInfo(result?.data);
      } catch (error) {
        throw new Error(error.message || 'something went wrong');
      }
    };
    fetchPackage();
  }, [selectedPackage]);

  const [showDetails, setShowDetails] = useState(false);
  const { userData } = UserAuth();
  const pack = selectedPackage.package_name || userData?.subscribedPackage;
  const { package_name, price, photos, facilities } = packageInfo || {};

  let totalPhotos =
    uploadedImages.length < 1 ? imageQuantityFromUrl : uploadedImages.length;
  let subTotal = totalPhotos * perPhotoCost;
  let taxTotal = (taxRate / 100) * subTotal;
  let grandTotal = subTotal + taxTotal;
  const remainingCredit = userData?.remainingCredit - totalPhotos;

  let billPropertiesForPayAsGo = [
    { title: 'Total Photos', value: totalPhotos },
    { title: 'Order Name', value: orderName },
    {
      title: 'Package',
      value: selectedPackage.package_name || userData?.subscribedPackage,
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
      title: 'Package',
      value: selectedPackage.package_name || userData?.subscribedPackage,
    },

    { title: 'Remaining Credit', value: remainingCredit },
  ];

  const billProperties =
    selectedPackage.package_name == 'pay as go'
      ? billPropertiesForPayAsGo
      : billPropertiesForCreditOrder;

  return (
    <div className='rounded bg-white p-5 '>
      <h3 className='mb-5 text-xl font-bold'> Summary</h3>

      {/* properties  */}
      <div className='my-5'>
        {billProperties.map((property, index) => (
          <div className='my-3' key={index}>
            <div className='flex items-center justify-between '>
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
      <div className='my-7 flex items-center space-x-3'>
        <div>
          <p className='rounded border px-5 py-2.5 text-2xl '>$</p>
        </div>
        <div>
          <h3 className='text-xl font-bold'>
            <span className='mr-1'>$</span> {grandTotal.toFixed(2)}{' '}
            <span>USD</span>
          </h3>
          <p className='text-neutral'>Cost</p>
        </div>
      </div>

      {/* billing btn and process  */}
      <BillingProcess
        subTotal={subTotal}
        taxTotal={taxTotal}
        perPhotoCost={perPhotoCost}
        grandTotal={grandTotal}
        totalPhotos={totalPhotos}
      />
    </div>
  );
};

export default BillingRightSide;
