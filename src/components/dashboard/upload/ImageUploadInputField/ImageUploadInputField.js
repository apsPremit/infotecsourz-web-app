import { StateContext } from '@/context/StateProvider';
import generateOrderId from '@/utils/functions/generateOrderId';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ImageUploadInputField = ({ setFileUrl, isUploading, selectedImages }) => {
    const { uploadedImages, imageQuantityFromUrl, setImageQuantityFromUrl, setOrderId, orderId } = useContext(StateContext)

    const handleFileUrl = (e) => {
        e.preventDefault()
        // generate order id 
        const generatedOrderId = generateOrderId()
        setOrderId(generatedOrderId)
        if (generatedOrderId) {
            toast.success('link added')
        }


        const url = e.target.fileURL.value
        const imageQuantity = e.target.imageQuantity.value
        setFileUrl(url)
        setImageQuantityFromUrl(imageQuantity)

    }

    return (
        <div >
            <h3 className='text-gray-500 text-lg mb-3'>Put file url from Drive, Dropbox or anywhere</h3>
            <form
                onSubmit={handleFileUrl}
                className=' space-y-3'>
                <input
                    required
                    type="url"
                    disabled={uploadedImages.length >= 1}
                    name='fileURL'
                    placeholder='File Url'
                    className='border  border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
                />
                <input
                    required
                    disabled={uploadedImages?.length >= 1}
                    type='number'
                    name='imageQuantity'
                    placeholder='Image Quantity'
                    className='border border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
                />

                <button
                    disabled={uploadedImages?.length >= 1 || isUploading || selectedImages?.length >= 1}
                    className='px-3.5 py-2 bg-main hover:bg-mainHover disabled:bg-mainHover disabled:cursor-not-allowed text-white rounded whitespace-nowrap'>Add Link</button>
            </form>
            <Toaster />
        </div>
    );
};

export default ImageUploadInputField;