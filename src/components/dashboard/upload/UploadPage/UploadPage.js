'use client';
import React, { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
// import { StateContext } from "@/context/StateProvider";
import './UploadPage.css';
import NotificationModal from '../NotificationModal/NotificationModal';
import ImageUploading from 'react-images-uploading';
import { useSession } from 'next-auth/react';
import UploadField from '../UploadField/UploadField';
import ImageUploadInputField from '../ImageUploadInputField/ImageUploadInputField';
import ShowImages from '../ShowImages/ShowImages';
import { StateContext } from '@/context/StateProvider';
import config from '@/config';

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
  const [isUploading, setUploading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [images, setImages] = useState([]);
  const session = useSession();
  const user = session?.data?.user;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const handleProceed = () => {
    router.push('/dashboard/specifications');
  };
  // image Upload
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleImageUploading = async () => {
    if (images.length < 1) return;

    if (
      user?.subscription === null ||
      (user?.subscription?.plan_type === 'paid' &&
        user?.subscription?.remaining_credit < images?.length)
    ) {
      return toast.error('you have not require credit please update your plan');
    }

    const formData = new FormData();
    for (const image of images) {
      formData.append('files', image.file);
    }
    try {
      setUploading(true);
      const res = await fetch(`${config.api_base_url}/images/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const result = await res.json();
      setUploadedImages(result.data.images);
      setOrderId(result.data.orderId);
      console.log('result', result);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log('image upload error', error);
    }
  };

  return (
    <div className='bg-white p-5'>
      <h1 className='text-xl font-bold py-3'>Upload</h1>
      <div>
        <div className=''>
          <ImageUploading
            onError={(error) => console.log('upload error', error)}
            multiple
            value={images}
            onChange={onChange}
            dataURLKey='data_url'
            acceptType={['jpg', 'gif', 'png', 'jpeg', 'webp']}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div>
                <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-16 space-y-8 lg:space-y-0'>
                  <div className='verticalLine relative'>
                    <span className='verticalOr'></span>
                    <div>
                      <UploadField
                        uploadEvent={onImageUpload}
                        isDragging={isDragging}
                        dragProps={{ ...dragProps }}
                      />
                    </div>
                  </div>
                  <div className=' md:hidden flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow'>
                    Or
                  </div>
                  {/* right side  */}

                  <div>
                    {/* input link  */}
                    <ImageUploadInputField
                      images={images}
                      isUploading={isUploading}
                      selectedImages={selectedImages}
                      setFileUrl={setFileUrl}
                    />
                  </div>
                </div>

                {/* show images  */}
                <div className='my-10'>
                  <ShowImages
                    uploadHandler={handleImageUploading}
                    uploadedImage={uploadedImages}
                    imageList={imageList}
                    onImageUpdate={onImageUpdate}
                    onImageRemove={onImageRemove}
                    onImageRemoveAll={onImageRemoveAll}
                    totalFileSize={totalFileSize}
                    uploadedImages={uploadedImages}
                    isUploading={isUploading}
                  />
                </div>
              </div>
            )}
          </ImageUploading>
          {/* process button  */}
          <div>
            <div className='flex  justify-center'>
              <button
                disabled={
                  !uploadedImages?.length > 0 && !imageQuantityFromUrl > 0
                }
                onClick={handleProceed}
                className='text-white px-3.5 py-2 bg-main hover:bg-mainHover  rounded  flex disabled:opacity-20 disabled:cursor-not-allowed'
              >
                {' '}
                {isUploading ? 'Loading..' : 'Proceed'}
              </button>
            </div>
          </div>
          <NotificationModal isOpen={isOpen} setIsOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
