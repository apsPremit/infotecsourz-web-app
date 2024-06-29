import React, { useContext } from 'react';
import Image from 'next/image';
import { ImSpinner10 } from 'react-icons/im';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { StateContext } from '../../../../context/StateProvider';

const ShowImages = ({
  isUploading,
  imageList,
  onImageRemoveAll,
  onImageRemove,
  onImageUpdate,
  uploadHandler,
}) => {
  const { uploadedImages } = useContext(StateContext);
  const isUploaded = uploadedImages?.length > 0;

  return (
    <div>
      <div className='flex justify-between '>
        <h3 className='font-bold text-lg'>Uploaded Files</h3>
        <div className='flex space-x-5 items-center'>
          <button
            onClick={uploadHandler}
            disabled={isUploading || isUploaded || imageList?.length < 1}
            className='bg-blue-500 text-white px-2 py-1.5 rounded text-sm disabled:bg-blue-200'
          >
            Upload
          </button>
          <button
            onClick={onImageRemoveAll}
            disabled={isUploading || isUploaded || imageList?.length < 1}
            className='bg-red-600 text-white px-2 py-1.5 rounded text-sm disabled:bg-red-200'
          >
            Remove All
          </button>
          <p>{imageList.length} Photos</p>
        </div>
      </div>
      <hr className='  bg-shadow my-3' />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {isUploaded
          ? uploadedImages.map((image, index) => (
              <div
                className='relative border border-shadow rounded'
                key={index}
              >
                <Image
                  src={image.url}
                  width={300}
                  height={180}
                  alt={`uploaded image ${index}`}
                  className='max-h-44 w-full '
                  style={{ objectFit: 'fill', height: '100%' }}
                />
                <p className='absolute top-1 left-2 text-xs text-ellipsis'>
                  {image.name.length > 25
                    ? image.name.substring(0, 25) + '...'
                    : image.name}
                </p>
                <p className='absolute bottom-1 left-2 text-xs'>
                  {(image.size / (1024 * 1024)).toFixed(3)} mb
                </p>
                {image.status && (
                  <span className='absolute right-2 bottom-1 text-green-500 p-1.5 bg-white rounded-full text-sm font-bold'>
                    <FaCheck />
                  </span>
                )}
              </div>
            ))
          : imageList.length > 0 &&
            imageList.map((image, index) => (
              <div
                className='relative border border-shadow rounded'
                key={index}
              >
                <Image
                  src={image['data_url']}
                  width={300}
                  height={180}
                  alt={`uploaded image ${index}`}
                  className='max-h-44 w-full '
                  style={{ objectFit: 'fill', height: '100%' }}
                />
                <p className='absolute top-1 left-2 text-xs text-ellipsis'>
                  {image.file.name.length > 25
                    ? image.file.name.substring(0, 25) + '...'
                    : image.file.name}
                </p>
                <p className='absolute bottom-1 left-2 text-xs'>
                  {(image.file.size / (1024 * 1024)).toFixed(3)} mb
                </p>

                <div className={`absolute bottom-1 right-4 space-x-2`}>
                  <button
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
                  </button>
                </div>

                {isUploading && (
                  <div className='absolute bg-black w-full h-full bg-opacity-90 top-0 left-0 flex justify-center items-center'>
                    <span className='flex justify-center items-center'>
                      <ImSpinner10
                        size={30}
                        className='animate-spin text-shadow'
                      />
                    </span>
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowImages;
