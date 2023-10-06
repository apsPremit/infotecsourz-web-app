"use client"
import { StateContext } from '@/context/StateProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

const SpecificationsLeftSide = () => {
    const { orderId, hasInstructions, setHasInstructions } = useContext(StateContext)

    const [isUploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleInstructionUpload = async (e) => {
        setUploading(true)
        const files = e.target.files

        const selectedFileArray = Array.from(files);
        const formData = new FormData()
        selectedFileArray.forEach(file => formData.append('instructions', file))

        try {

            const res = await axios.post(`${baseUrl}/instructions?folderName=${orderId}&bucketName=${process.env.NEXT_PUBLIC_SAMPLE_BUCKET}`, formData)
            const data = await res.data
            setUploading(false)
            if (data.success) {
                setHasInstructions(true)
            }
            toast.success('upload successful')
        } catch (error) {

            setUploading(false)
            toast.error('something wrong')
        }


        e.target.value = "";


    }



    return (
        <div>
            <div>
                <h3 className='font-bold text-xl mb-3'>Product Details</h3>
                <p className=''>Check your product details that you’ve uploaded just now, and if you think any details is incorrect you are free to make these details perfect.</p>
            </div>
            <div className='mt-8'>
                <h3 className='mb-2 text-md font-bold'>Upload Your special Instruction or sample</h3>
                <label

                    htmlFor="instructions"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${hasInstructions ? 'bg-blue-500 text-white hover:bg-blue-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'} `}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-2xl mb-3">
                            <BsUpload />
                        </span>
                        <p className="mb-2 text-sm  dark:text-gray-400">
                            <span className="font-semibold">Click to upload special instructions or sample</span>
                        </p>
                        <p className="text-xs  dark:text-gray-400">
                            SVG, PNG, JPG, GIF or PDF
                        </p>
                        {
                            isUploading && <div className='flex items-center justify-center text-xl text-main'><ImSpinner2 className='animate-spin' /></div>
                        }
                    </div>
                    <input
                        onChange={handleInstructionUpload}
                        id="instructions"
                        type="file"
                        multiple
                        name="instructions"
                        disabled={hasInstructions}
                        className='hidden disabled:cursor-not-allowed'

                    />
                </label>
            </div>
            <Toaster />
        </div>
    );


};

export default SpecificationsLeftSide;