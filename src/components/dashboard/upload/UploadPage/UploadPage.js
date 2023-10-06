"use client"
import React, { useContext, useState } from 'react';
import UploadField from '../UploadField/UploadField';
import UploadStatusContainer from '../UploadStatusContainer/UploadStatusContainer';
import ImageUploadInputField from '../ImageUploadInputField/ImageUploadInputField';
import ShowImages from '../ShowImages/ShowImages';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/StateProvider';
import './UploadPage.css'

const UploadPage = () => {
    const { totalFileSize, setTotalFileSize, uploadedImages, setUploadedImages, imageQuantityFromUrl, setFileUrl, orderId, setOrderId } = useContext(StateContext)
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setUploading] = useState(false)

    const router = useRouter()



    return (

        <div className="">
            <div className="bg-white p-5">
                <h1 className="text-xl font-bold py-3">Upload</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 space-y-8 lg:space-y-0">


                    <div className='verticalLine relative'>
                        <span className='verticalOr'></span>
                        <UploadField
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                            totalFileSize={totalFileSize}
                            setTotalFileSize={setTotalFileSize}
                            uploadedImages={uploadedImages}
                            setUploadedImages={setUploadedImages}
                            orderId={orderId}
                            setOrderId={setOrderId}
                            setUploadProgress={setUploadProgress}
                            setUploading={setUploading}
                        />
                    </div>


                    <div className=" md:hidden flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div>

                    {/* image url field  */}
                    <ImageUploadInputField isUploading={isUploading} selectedImages={selectedImages} setFileUrl={setFileUrl} />
                    {/* <UploadStatusContainer uploadProgress={uploadProgress} isUploading={isUploading} /> */}
                </div>



                {/* or horizontal line */}
                {/* <div className="py-6 flex items-center text-gray-400  uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 before:border-shadow after:border-shadow">Or</div> */}



                {/* uploaded image showing container  */}

                <div className="my-10">
                    <ShowImages
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        totalFileSize={totalFileSize}
                        uploadedImages={uploadedImages}
                        isUploading={isUploading}
                    />
                </div>
                <div>
                    <div className='flex  justify-center'>

                        <button
                            disabled={!uploadedImages.length > 0 && !imageQuantityFromUrl > 0}
                            onClick={() => router.push('/dashboard/specifications')}
                            className='text-white px-3.5 py-2 bg-main hover:bg-mainHover rounded  flex disabled:bg-mainHover disabled:cursor-not-allowed'> {
                                isUploading ? 'Loading..' : "Proceed"
                            }
                        </button>
                    </div>
                </div>
            </div>


        </div>


    );
};

export default UploadPage;  