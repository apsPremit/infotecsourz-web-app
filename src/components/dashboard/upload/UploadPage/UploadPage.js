'use client';
import React, { useContext, useState } from 'react';
import UploadField from '../UploadField/UploadField';
import ImageUploadInputField from '../ImageUploadInputField/ImageUploadInputField';
import ShowImages from '../ShowImages/ShowImages';
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/StateProvider';
import './UploadPage.css';
import NotificationModal from '../NotificationModal/NotificationModal';

const UploadPage = () => {
  const {
    totalFileSize,
    setTotalFileSize,
    uploadedImages,
    setUploadedImages,
    imageQuantityFromUrl,
    setFileUrl,
    orderId,
    setOrderId,
    perPhotoCost,
    selectedPackage,
  } = useContext(StateContext);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const handleProceed = () => {
    router.push('/dashboard/specifications');
  };

  return (
    <div className=''>
      <div className='bg-white p-5'>
        <h1 className='py-3 text-xl font-bold'>Upload</h1>
        <div className='grid grid-cols-1 space-y-8 md:gap-16 lg:grid-cols-2 lg:space-y-0'>
          <div className='verticalLine relative'>
            <span className='verticalOr'></span>
            <UploadField
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              totalFileSize={totalFileSize}
              setTotalFileSize={setTotalFileSize}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              orderId={orderId}
              setOrderId={setOrderId}
              setUploadProgress={setUploadProgress}
              setUploading={setUploading}
            />
          </div>

          <div className=' dark:text-gray-500 flex items-center uppercase  text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-shadow after:ml-6 after:flex-[1_1_0%] after:border-t after:border-shadow md:hidden'>
            Or
          </div>

          {/* image url field  */}
          <ImageUploadInputField
            isUploading={isUploading}
            selectedImages={selectedImages}
            setFileUrl={setFileUrl}
          />
          {/* <UploadStatusContainer uploadProgress={uploadProgress} isUploading={isUploading} /> */}
        </div>

        {/* or horizontal line */}
        {/* <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div> */}

        {/* uploaded image showing container  */}

        <div className='my-10'>
          <ShowImages
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            totalFileSize={totalFileSize}
            uploadedImages={uploadedImages}
            isUploading={isUploading}
          />
        </div>
        <div>
          <div className='flex  justify-center'>
            <button
              disabled={!uploadedImages.length > 0 && !imageQuantityFromUrl > 0}
              onClick={handleProceed}
              className='flex rounded bg-main px-3.5 py-2 text-white  hover:bg-mainHover disabled:cursor-not-allowed disabled:bg-mainHover'
            >
              {' '}
              {isUploading ? 'Loading..' : 'Proceed'}
            </button>
          </div>
        </div>
      </div>

      <NotificationModal isOpen={isOpen} setIsOpen={setOpen} />
    </div>
  );
};

export default UploadPage;
