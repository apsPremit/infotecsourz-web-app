import React, { useContext } from 'react';
import Image from 'next/image';
import { ImSpinner10 } from 'react-icons/im';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { StateContext } from '../../../../context/StateProvider';
import { useDeleteSingleImageMutation } from '@/redux/services/imageApi';

const ShowImages = () => {
  const [deleteImage] = useDeleteSingleImageMutation();
  const {
    uploadedImageCount,
    setUploadedImageCount,
    images,
    setImages,
    imageSource,
  } = useContext(StateContext);
  const isUploaded = uploadedImageCount > 0;
  const allUploaded = images.every((img) => img.isUploaded === true);
  const handleDeleteImage = async (index) => {
    const removedImage = images[index];

    // Check if all images have isUploaded set to true
    const allUploaded = images.every((img) => img.isUploaded === true);

    if (!allUploaded) {
      console.log('Not all images are uploaded yet.');
      return;
    }

    console.log('All images are uploaded, proceeding with deletion.');

    const key = `${imageSource}/${removedImage?.file?.name}`;
    console.log(key);

    try {
      const response = await deleteImage(key).unwrap();
      const deleteResponse = response?.data?.status === 204;

      if (deleteResponse) {
        // Remove the image from the state if deletion is successful
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
      } else {
        console.log('Failed to delete the image.');
        return;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div className='flex justify-between '>
        <h3 className='font-bold text-lg'>Uploaded Files</h3>
        <div className='flex space-x-5 items-center'>
          <p>{images.length} Photos</p>
        </div>
      </div>
      <hr className='  bg-shadow my-3' />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {images.length > 0 &&
          images.map((image, index) => (
            <div className='relative border border-shadow rounded' key={index}>
              <Image
                src={image['data_url']}
                width={300}
                height={180}
                alt={`uploaded image ${index}`}
                className='max-h-44 w-full '
                style={{ objectFit: 'fill', height: '100%' }}
              />

              {image?.loading && (
                <div className='absolute bg-black w-full h-full bg-opacity-90 top-0 left-0 flex justify-center items-center'>
                  <span className='flex justify-center items-center'>
                    <ImSpinner10
                      size={30}
                      className='animate-spin text-shadow'
                    />
                  </span>
                </div>
              )}
              <p className='absolute top-1 left-2 text-xs text-ellipsis bg-white px-1.5 rounded bg-opacity-25'>
                {image.file.name.length > 25
                  ? image.file.name.substring(0, 25) + '...'
                  : image.file.name}
              </p>
              <p className='absolute bottom-1 left-2 text-xs bg-white px-1.5 rounded bg-opacity-25'>
                {(image.file.size / (1024 * 1024)).toFixed(3)} mb
              </p>
              {image?.isUploaded && (
                <div className='absolute bottom-1  font-bold flex gap-5 right-2 '>
                  <span className=' text-green-500 p-1.5 bg-white rounded-full text-sm'>
                    <FaCheck />
                  </span>
                  {allUploaded && (
                    <button
                      title='remove image'
                      // onClick={() => onImageRemove(index)}
                      onClick={() => handleDeleteImage(index)}
                      className=' text-md text-red-500 p-1.5 rounded bg-white'
                    >
                      <FaRegTrashAlt />
                    </button>
                  )}
                </div>
              )}
              {(image.isUploaded === false || image.loading) && (
                <div className={`absolute bottom-1 right-4 space-x-2`}>
                  {/* <button
                    title='remove image'
                    onClick={() => onImageRemove(index)}
                    className=' text-md text-red-500 p-1.5 rounded bg-white'
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    title='Update image'
                    onClick={() => onImageUpdate(index)}
                    className=' text-md text-green-500 p-1.5 rounded bg-white'
                  >
                    <FaRegEdit />
                  </button> */}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowImages;
