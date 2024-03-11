import React from 'react';
import uploadedImage from '../../../../../public/images/others/uploaded_image.jpg';
import defaultImage from 'next/image';
import { BsTrash } from 'react-icons/bs';
import Image from 'next/image';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { ImSpinner10 } from 'react-icons/im';

const ShowImages = ({
  uploadedImages,
  selectedImages,
  setSelectedImages,
  totalFileSize,
  isUploading,
}) => {
  return (
    <div>
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold'>Uploaded Files</h3>
        <p className='text-sm'>
          {/* {selectedImages.length || 0} Photos - {totalFileSize} MB */}
          {uploadedImages.length || 0} Photos
        </p>
      </div>
      <hr className='  my-3 bg-shadow' />
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {uploadedImages.length >= 1
          ? uploadedImages.map((image, index) => (
              <div
                className='relative rounded border border-shadow'
                key={index}
              >
                <Image
                  src={image}
                  width={300}
                  height={180}
                  alt={`uploaded image ${index}`}
                  className='max-h-44 w-full '
                  style={{ objectFit: 'contain', height: '100%' }}
                />

                {isUploading && (
                  <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-90'>
                    <span className='flex items-center justify-center'>
                      <ImSpinner10
                        size={30}
                        className='animate-spin text-shadow'
                      />
                    </span>
                  </div>
                )}

                {uploadedImages.length >= 1 && (
                  <span className='absolute right-2 top-2 text-green-500'>
                    <IoIosCheckmarkCircle color='' size={20} />
                  </span>
                )}
              </div>
            ))
          : selectedImages.map((image, index) => (
              <div
                className='relative rounded border border-shadow'
                key={index}
              >
                <Image
                  src={image}
                  width={300}
                  height={180}
                  alt={`uploaded image ${index}`}
                  className='max-h-44 w-full '
                  style={{ objectFit: 'contain', height: '100%' }}
                />

                {isUploading && (
                  <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-90'>
                    <span className='flex items-center justify-center'>
                      <ImSpinner10
                        size={30}
                        className='animate-spin text-shadow'
                      />
                    </span>
                  </div>
                )}

                {uploadedImages.length >= 1 && (
                  <span className='absolute right-2 top-2 text-green-500'>
                    <IoIosCheckmarkCircle color='' size={20} />
                  </span>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowImages;
