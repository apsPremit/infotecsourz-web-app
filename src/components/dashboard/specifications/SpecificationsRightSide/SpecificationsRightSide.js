'use client';
import { StateContext } from '@/context/StateProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

const SpecificationsRightSide = () => {
  const {
    productDetailsDescription,
    orderId,
    hasInstructions,
    setHasInstructions,
    setProductDetailsDescription,
    returnTime,
  } = useContext(StateContext);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleProceed = () => {
    router.push('/dashboard/billing');
  };

  const handleInstructionUpload = async (e) => {
    setUploading(true);
    const files = e.target.files;

    const selectedFileArray = Array.from(files);
    const formData = new FormData();
    selectedFileArray.forEach((file) => formData.append('instructions', file));

    try {
      const res = await axios.post(
        `${baseUrl}/instructions?folderName=${orderId}&bucketName=${process.env.NEXT_PUBLIC_SAMPLE_BUCKET}`,
        formData
      );
      const data = await res.data;
      setUploading(false);
      if (data.success) {
        setHasInstructions(true);
      }
      toast.success('upload successful');
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error('something wrong');
    }

    e.target.value = '';
  };

  return (
    <div>
      <div className=''></div>
      {/* text area  */}
      <div className='mt-6 w-full'>
        <label>
          <span className='mb-4 ml-1 text-sm text-black'>
            Detail Instruction <span className='text-red-500'>*</span>
          </span>
          <textarea
            defaultValue={productDetailsDescription}
            name=''
            id=''
            onBlur={(e) => setProductDetailsDescription(e.target.value)}
            rows={5}
            className='w-full border border-shadow px-5 py-3 text-[#9d9c9c] outline-0 focus:rounded focus:border-main'
          ></textarea>
        </label>
      </div>

      <div className='mt-10'>
        <h3 className='text-md mb-3 font-bold'>
          Upload Your special Instruction or sample
        </h3>
        <label
          htmlFor='instructions'
          className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 ${
            hasInstructions
              ? 'bg-blue-500 text-white hover:bg-blue-500'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          } `}
        >
          <div className='flex flex-col items-center justify-center px-3 pb-6 pt-5 text-center lg:text-start'>
            <span className='mb-3 text-2xl'>
              <BsUpload />
            </span>
            <p className='dark:text-gray-400 mb-2  text-sm'>
              <span className='font-semibold'>
                Click to upload special instructions or sample
              </span>
            </p>
            <p className='dark:text-gray-400  text-xs'>
              SVG, PNG, JPG, GIF or PDF
            </p>
            {isUploading && (
              <div className='flex items-center justify-center text-xl text-main'>
                <ImSpinner2 className='animate-spin' />
              </div>
            )}
          </div>
          <input
            onChange={handleInstructionUpload}
            id='instructions'
            type='file'
            multiple
            name='instructions'
            disabled={hasInstructions}
            className='hidden disabled:cursor-not-allowed'
          />
        </label>
      </div>
      {/* btn proceed  */}
      <div className='mt-5 flex justify-end'>
        <button
          disabled={!returnTime}
          onClick={handleProceed}
          className='flex rounded bg-main px-3.5 py-2 text-white hover:bg-mainHover disabled:cursor-not-allowed disabled:bg-mainHover'
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SpecificationsRightSide;
