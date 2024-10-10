'use client';

import { BsUpload } from 'react-icons/bs';

const RevisionImgUploadField = ({ uploadEvent, isDragging, dragProps }) => {
  return (
    <div {...dragProps} className='w-full'>
      <label
        className={`${
          isDragging ? 'bg-gray-200' : 'bg-gray-50'
        }  hover:bg-gray-100 flex  items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg `}
      >
        {isDragging ? (
          <p>Drop Here</p>
        ) : (
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <span className='text-2xl mb-3'>
              <BsUpload />
            </span>
            <button
              type='button'
              // disabled={isUploaded}
              onClick={uploadEvent}
              className='bg-blue-500 px-2 py-1.5 rounded text-white disabled:opacity-20 disabled:bg-blue-100'
            >
              Upload Images
            </button>
            <span>or</span>
            <button> Drop Images</button>
          </div>
        )}
      </label>
    </div>
  );
};

export default RevisionImgUploadField;
