import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react';
import { StateContext } from '@/context/StateProvider';
import randomGenerator from '@/utils/functions/randomGenerator';
import { useAuth } from '@/context/AuthProvider';

const ImageUploadInputField = ({ setFileUrl, isUploading, images }) => {
  const { userData } = useAuth();

  const {
    uploadedImageCount,
    imageQuantityFromUrl,
    fileUrl,
    setImageQuantityFromUrl,
    setOrderId,
    orderId,
  } = useContext(StateContext);
  const isDisabled = uploadedImageCount > 0 || images?.length > 0;

  const handleFileUrl = (e) => {
    const generateId = randomGenerator();
    e.preventDefault();
    console.log(
      userData?.subscription?.remaining_credit,
      setImageQuantityFromUrl
    );

    // generate order id

    const url = e.target.fileURL.value;
    const imageQuantity = e.target.imageQuantity.value;
    if (
      userData?.subscription === null ||
      (userData?.subscription?.plan_type === 'paid' &&
        userData?.subscription?.remaining_credit < imageQuantity)
    ) {
      return toast.error('you have not require credit please update your plan');
    }
    setFileUrl(url);
    setImageQuantityFromUrl(imageQuantity);
    setOrderId(generateId);
    toast.success('image source link added');
  };

  return (
    <div>
      <h3 className='text-gray-500 text-lg mb-3'>
        Add Google Drive, Dropbox, WeTransfer, FTP or any link{' '}
      </h3>
      <form onSubmit={handleFileUrl} className=' space-y-3'>
        <div className='mb-5'>
          <label className='block mb-1 text-sm' htmlFor='file link'>
            File Link
          </label>
          <input
            defaultValue={fileUrl}
            required
            type='url'
            disabled={isDisabled}
            name='fileURL'
            className='border  border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
          />
        </div>
        <div className='mb-5'>
          <label className='block mb-1 text-sm' htmlFor='photo quantity'>
            Quantity of photo
          </label>
          <input
            defaultValue={imageQuantityFromUrl == 0 ? '' : imageQuantityFromUrl}
            required
            disabled={isDisabled}
            type='text'
            name='imageQuantity'
            className='border border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
          />
        </div>
        <button
          disabled={isDisabled || isUploading}
          className='px-3.5 py-2 bg-main hover:bg-mainHover disabled:opacity-20 disabled:cursor-not-allowed text-white rounded whitespace-nowrap'
        >
          Add Link
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default ImageUploadInputField;
