'use client';
import React, { useContext, useState } from 'react';
import styles from '@/app/styles.module.css';
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
import { imageFormats } from '@/assets/images/imgTypes';

const UploadPage = () => {
  const {
    totalFileSize,
    uploadedImages,
    setUploadedImageCount,
    setFileUrl,
    setOrderId,
    setImageSource,
    images,
    fileUrl,
    imageSource,
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
  const [tempSource, setTempSource] = useState(null);

  const handleProceed = () => {
    if (!imageSource && !fileUrl) {
      return toast.error('please upload your photos');
    }
    router.push('/dashboard/specifications');
  };
  // image Upload
  const onChange = async (imageList, addUpdateIndex) => {
    imageList.forEach((image) => {
      console.log('File type:', image.file.type); // Log file types to console
    });

    // checks credit available or not
    if (
      userData?.subscription === null ||
      (userData?.subscription?.plan_type === 'paid' &&
        userData?.subscription?.remaining_credit < images?.length)
    ) {
      return toast.error(
        'You do not have enough credits. Please update your plan.'
      );
    }

    // Function to handle renaming of files with duplicate names
    const renameDuplicateFiles = (fileList) => {
      const nameCount = {}; // Keeps track of file names and their counts
      return fileList.map((file) => {
        const { name } = file.file;
        // Initialize or increment count for the name
        if (!nameCount[name]) {
          nameCount[name] = 0;
        } else {
          nameCount[name]++;
        }

        // Generate a new file name with a count if it's a duplicate
        const newName =
          nameCount[name] > 0 ? `${name} (${nameCount[name]})` : name;

        return {
          ...file,
          file: new File([file.file], newName, { type: file.file.type }),
        };
      });
    };

    const updatedImageList = renameDuplicateFiles(
      imageList.map((img) => ({
        ...img,
        loading: false,
        isUploaded: false,
      }))
    );

    // Filter out files that are already in the images state
    const filteredImageList = updatedImageList.filter((newImage) => {
      return !images.some(
        (existingImage) =>
          existingImage.file.name === newImage.file.name &&
          existingImage.file.size === newImage.file.size
      );
    });

    // Merge the filtered new images with the existing ones
    const mergedImages = [...images, ...filteredImageList];
    setImages(mergedImages);

    // Filter images that need to be uploaded
    const imagesToUpload = mergedImages.filter((image) => !image.isUploaded);

    if (imagesToUpload.length === 0) {
      // If all images are already uploaded, proceed with the next step
      return;
    }

    // Upload image
    const files = imagesToUpload.map((image) => image.file);
    const filePayloads = imagesToUpload.map((image) => ({
      contentType: image.file.type,
      fileName: image.file.name,
    }));

    try {
      const response = await getUploadUrl({
        filePayloads,
        userId: user?.userId,
        imageSource: tempSource || imageSource,
      }).unwrap();

      const urls = response?.data?.urls;
      setTempSource(response?.data?.image_source);
      await uploadFiles(urls, files);
      setOrderId(response?.data?.order_id);
      setImageSource(response?.data?.image_source);
      setUploadedImageCount(urls.length);
      toast.success('images uploaded successfully');
    } catch (error) {
      console.log(error);
      return toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  const updateImgStatus = (imageName, loading = false, isUploaded = false) => {
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
      console.log('file', file.type);
      const response = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'content-length': 0,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      updateImgStatus(file.name, false, true);
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

  return (
    <div className='bg-white p-5'>
      <h1 className='text-xl font-bold py-3'>Upload</h1>
      <div>
        <div className=''>
          <ImageUploading
            allowNonImageType
            onError={(error) => console.log('upload error', error)}
            multiple
            value={images}
            onChange={onChange}
            maxNumber={100000}
            dataURLKey='data_url'
            acceptType={imageFormats}
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
                    // uploadHandler={handleImageUploading}
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
            <div className='flex  justify-end gap-5'>
              <button
                onClick={() => router.back()}
                className={styles.btn_shadow}
              >
                Back
              </button>
              <button
                onClick={handleProceed}
                className='text-white px-3.5 py-2 bg-main hover:bg-mainHover  rounded  flex disabled:opacity-20 disabled:cursor-not-allowed'
              >
                Proceed
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
