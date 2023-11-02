import { StateContext } from '@/context/StateProvider';
import generateOrderId from '@/utils/functions/generateOrderId';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ImageUploadInputField = ({ setFileUrl, isUploading, selectedImages }) => {
    const { uploadedImages, imageQuantityFromUrl, fileUrl, setImageQuantityFromUrl, setOrderId, orderId } = useContext(StateContext)


    const handleFileUrl = (e) => {
        e.preventDefault()
        // generate order id 



        const url = e.target.fileURL.value
        const imageQuantity = e.target.imageQuantity.value
        console.log(typeof (imageQuantity))
        setFileUrl(url)
        setImageQuantityFromUrl(imageQuantity)

    }


    return (
        <div >
            <h3 className='text-gray-500 text-lg mb-3'>Add Google Drive, Dropbox, WeTransfer, FTP or any link </h3>
            <form
                onSubmit={handleFileUrl}
                className=' space-y-3'>
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="file link">File Link</label>
                    <input
                        defaultValue={fileUrl}
                        required
                        type="url"
                        disabled={uploadedImages.length >= 1}
                        name='fileURL'
                        className='border  border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
                    />
                </div>
                <div className='mb-5'>
                    <label className='block mb-1 text-sm' htmlFor="photo quantity">Quantity of photo</label>
                    <input
                        defaultValue={imageQuantityFromUrl == 0 ? '' : imageQuantityFromUrl}
                        required
                        disabled={uploadedImages?.length >= 1}
                        type='text'
                        name='imageQuantity'
                        className='border border-shadow w-full px-3 py-2 rounded outline-0 focus:border-main'
                    />

                </div>
                <button
                    disabled={uploadedImages?.length >= 1 || isUploading || selectedImages?.length >= 1}
                    className='px-3.5 py-2 bg-main hover:bg-mainHover disabled:bg-mainHover disabled:cursor-not-allowed text-white rounded whitespace-nowrap'>Add Link</button>
            </form>
            <Toaster />
        </div>
    );
};

export default ImageUploadInputField;