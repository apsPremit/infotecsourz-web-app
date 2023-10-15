import React from 'react';
import uploadedImage from '../../../../../public/images/others/uploaded_image.jpg'
import defaultImage from 'next/image';
import { BsTrash } from "react-icons/bs";
import Image from 'next/image';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ImSpinner10 } from 'react-icons/im';


const ShowImages = ({ uploadedImages, selectedImages, setSelectedImages, totalFileSize, isUploading }) => {

    return (
        <div>
            <div className='flex justify-between'>
                <h3 className='font-bold text-lg'>Uploaded Files</h3>
                <p className='text-sm'>
                    {/* {selectedImages.length || 0} Photos - {totalFileSize} MB */}
                    {uploadedImages.length || 0} Photos
                </p>
            </div>
            <hr className='  bg-shadow my-3' />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                {
                    uploadedImages.length >= 1 ?
                        uploadedImages.map((image, index) =>
                            <div className='relative border border-shadow rounded'
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

                                {
                                    isUploading && <div className='absolute bg-black w-full h-full bg-opacity-90 top-0 left-0 flex justify-center items-center'>
                                        <span className='flex justify-center items-center'>
                                            <ImSpinner10 size={30} className='animate-spin text-shadow' />
                                        </span>
                                    </div>
                                }

                                {
                                    uploadedImages.length >= 1 && <span className='absolute top-2 right-2 text-green-500'><IoIosCheckmarkCircle color='' size={20} /></span>
                                }
                            </div>
                        )

                        :

                        selectedImages.map((image, index) =>
                            <div className='relative border border-shadow rounded'
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

                                {
                                    isUploading && <div className='absolute bg-black w-full h-full bg-opacity-90 top-0 left-0 flex justify-center items-center'>
                                        <span className='flex justify-center items-center'>
                                            <ImSpinner10 size={30} className='animate-spin text-shadow' />
                                        </span>
                                    </div>
                                }

                                {
                                    uploadedImages.length >= 1 && <span className='absolute top-2 right-2 text-green-500'><IoIosCheckmarkCircle color='' size={20} /></span>
                                }
                            </div>
                        )

                }







            </div>
        </div>
    );
};

export default ShowImages;