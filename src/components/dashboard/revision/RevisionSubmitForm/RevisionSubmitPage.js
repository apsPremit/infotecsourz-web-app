'use client';
import { imageFormats } from '@/assets/images/imgTypes';
import config from '@/config';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactImageUploading from 'react-images-uploading';
import RevisionImgUploadField from '@/components/ui/RevisionImgUploadField';
import { useGetRevisionImgUploadUrlMutation } from '@/redux/services/revisionApi';
import RevisionImageShow from '@/components/ui/RevisionImageShow';

const RevisionSubmitPage = ({ order, user }) => {
  const params = useParams();
  const orderId = params.id;
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [tempSource, setTempSource] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [getUploadUrl] = useGetRevisionImgUploadUrlMutation();
  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const details = form.details.value;
    const formData = {
      order_id: order?.id,
      user_id: user.userId,
      details,
      image_source: imageSource,
    };

    try {
      const response = await fetch(
        `${config.api_base_url}/revisions/create-revision`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.AccessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        router.push(`/dashboard/revision/success?orderId=${order?.id}`);
      } else {
        return toast.error(result?.message || 'something went wrong');
      }
    } catch (error) {
      toast.error(error?.message);
      console.log('rev', error);
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

  const onChange = async (imageList, addUpdateIndex) => {
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
        orderId,
        data: {
          filePayloads,
          userId: user?.userId,
          imageSource: tempSource || imageSource,
        },
      }).unwrap();

      const urls = response?.data?.urls;
      setTempSource(response?.data?.image_source);
      await uploadFiles(urls, files);
      setImageSource(response?.data?.image_source);
      toast.success('images uploaded successfully');
    } catch (error) {
      console.log(error);
      return toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className='bg-white p-10'>
      <h1 className='mb-3 text-center text-xl font-semibold'>
        Revision Request
      </h1>
      <ReactImageUploading
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
          <form onSubmit={handleRevisionSubmit} className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10  '>
              <div className='w-full'>
                <div className='mb-5'>
                  <label className='mb-1 block text-sm' htmlFor='loginEmail'>
                    Email<span className='text-red-500'>*</span>
                  </label>
                  <input
                    defaultValue={user?.email}
                    readOnly
                    type='email'
                    id='loginEmail'
                    name='email'
                    className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                  />
                </div>
                <div className='mb-5'>
                  <label className='mb-1 block text-sm' htmlFor='loginEmail'>
                    OrderId<span className='text-red-500'>*</span>
                  </label>
                  <input
                    defaultValue={order?.id}
                    readOnly
                    type='text'
                    id='orderId'
                    name='orderId'
                    className=' w-full  rounded-md border border-shadow px-3 py-2 outline-0 focus:border-main'
                  />
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='message'
                    className='dark:text-gray-400 mb-2 block text-sm font-medium text-gray-900'
                  >
                    Details
                  </label>
                  <textarea
                    id='details'
                    name='details'
                    rows={6}
                    required
                    className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    placeholder='Details...'
                  />
                </div>
              </div>

              <div>
                <div>
                  <div className='mt-5 space-y-8 lg:space-y-0'>
                    <div className='verticalLine relative'>
                      <span className='verticalOr'></span>
                      <div className='w-full'>
                        <RevisionImgUploadField
                          uploadEvent={onImageUpload}
                          isDragging={isDragging}
                          dragProps={{ ...dragProps }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Toaster />
            </div>
            <div className='my-10'>
              <RevisionImageShow
                images={images}
                imageSource={imageSource}
                setImages={setImages}
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='mt-10  rounded bg-main px-3 py-2 text-white hover:bg-mainHover'
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ReactImageUploading>
    </div>
  );
};

export default RevisionSubmitPage;
