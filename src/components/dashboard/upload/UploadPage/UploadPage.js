'use client';
import React, { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
import './UploadPage.css';
import NotificationModal from '../NotificationModal/NotificationModal';
import ImageUploading from 'react-images-uploading';
import { useSession } from 'next-auth/react';
import UploadField from '../UploadField/UploadField';
import ImageUploadInputField from '../ImageUploadInputField/ImageUploadInputField';
import ShowImages from '../ShowImages/ShowImages';
import { StateContext } from '@/context/StateProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthProvider';
import {
  useGetUploadUrlMutation,
  useUploadImageMutation,
} from '@/redux/services/imageApi';

const UploadPage = () => {
  const {
    totalFileSize,
    uploadedImages,
    setUploadedImageCount,
    setFileUrl,
    setOrderId,
    setImageSource,
    images,
    setImages,
  } = useContext(StateContext);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setUploading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const { userData } = useAuth();
  const [getUploadUrl] = useGetUploadUrlMutation();
  const [uploadImage] = useUploadImageMutation();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const handleProceed = () => {
    const anyImageNotUploaded = images.some((image) => !image.isUploaded);
    if (anyImageNotUploaded) {
      return toast.error('file upload is not completed');
    }
    router.push('/dashboard/specifications');
  };
  // image Upload
  const onChange = (imageList, addUpdateIndex) => {
    const images = imageList.map((img) => {
      img.loading = false;
      img.isUploaded = false;
    });
    setImages(imageList);
  };

  const updateImgStatus = (imageName, loading = false, isUploaded = false) => {
    console.log('changing status', imageName);

    setImages((prevImages) =>
      prevImages.map((image) =>
        image.file.name === imageName
          ? { ...image, loading: loading, isUploaded: isUploaded }
          : image
      )
    );
  };

  const uploadFile = async (url, file) => {
    updateImgStatus(file.name, true, false);
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      updateImgStatus(file.name, false, true);
      console.log(`Uploaded ${file.name} successfully`);
    } catch (error) {
      updateImgStatus(file.name, false, false);
      console.error(`Error uploading ${file.name}:`, error);
    }
  };

  const uploadFiles = async (urls, files) => {
    const uploadPromises = urls.map((url, index) =>
      uploadFile(url, files[index])
    );
    // eslint-disable-next-line no-undef
    await Promise.all(uploadPromises);
  };
  const handleImageUploading = async () => {
    if (images.length < 1) return;

    if (
      userData?.subscription === null ||
      (userData?.subscription?.plan_type === 'paid' &&
        userData?.subscription?.remaining_credit < images?.length)
    ) {
      return toast.error('you have not require credit please update your plan');
    }
    const files = images.map((image) => image.file);
    console.log({ files });
    const filePayloads = images.map((image) => ({
      contentType: image.file.type,
      fileName: image.file.name,
    }));
    const response = await getUploadUrl({ filePayloads, userId: user?.userId });
    if (response?.error) {
      console.log(response);
      return toast.error(
        response?.error?.data?.message || 'something went wrong!'
      );
    }
    if (response?.data) {
      const urls = response?.data?.data?.urls;
      console.log(urls);
      await uploadFiles(urls, files);
      setOrderId(response?.data?.data?.order_id);
      setImageSource(response?.data?.data?.image_source);
      setUploadedImageCount(urls.length);
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
                onClick={handleProceed}
                className='text-white px-3.5 py-2 bg-main hover:bg-mainHover  rounded  flex disabled:opacity-20 disabled:cursor-not-allowed'
              >
                {isUploading ? 'Loading..' : 'Proceed'}
              </button>
            </div>
          </div>
          <NotificationModal isOpen={isOpen} setIsOpen={setOpen} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UploadPage;
