import { StateContext } from '@/context/StateProvider';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ImageUploadInputField = ({ setFileUrl, isUploading, selectedImages }) => {
  const {
    uploadedImages,
    imageQuantityFromUrl,
    fileUrl,
    setImageQuantityFromUrl,
    setOrderId,
    orderId,
  } = useContext(StateContext);

  const handleFileUrl = (e) => {
    e.preventDefault();
    // generate order id

    const url = e.target.fileURL.value;
    const imageQuantity = e.target.imageQuantity.value;

    setFileUrl(url);
    setImageQuantityFromUrl(imageQuantity);
  };

  return (
    <div>
      <h3 className='mb-3 text-lg text-gray-500'>
        Add Google Drive, Dropbox, WeTransfer, FTP or any link{' '}
      </h3>
      <form onSubmit={handleFileUrl} className=' space-y-3'>
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='file link'>
            File Link
          </label>
          <input
            defaultValue={fileUrl}
            required
            type='url'
            disabled={uploadedImages.length >= 1}
            name='fileURL'
            className='w-full  rounded border border-shadow px-3 py-2 outline-0 focus:border-main'
          />
        </div>
        <div className='mb-5'>
          <label className='mb-1 block text-sm' htmlFor='photo quantity'>
            Quantity of photo
          </label>
          <input
            defaultValue={imageQuantityFromUrl == 0 ? '' : imageQuantityFromUrl}
            required
            disabled={uploadedImages?.length >= 1}
            type='text'
            name='imageQuantity'
            className='w-full rounded border border-shadow px-3 py-2 outline-0 focus:border-main'
          />
        </div>
        <button
          disabled={
            uploadedImages?.length >= 1 ||
            isUploading ||
            selectedImages?.length >= 1
          }
          className='whitespace-nowrap rounded bg-main px-3.5 py-2 text-white hover:bg-mainHover disabled:cursor-not-allowed disabled:bg-mainHover'
        >
          Add Link
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default ImageUploadInputField;
