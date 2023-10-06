import React from 'react';
import { AiOutlineFile } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner10 } from "react-icons/im";


const UploadStatusContainer = ({ uploadProgress, isUploading }) => {
    return (
        <div className='border border-shadow rounded-lg p-5'>
            <p className='text-lg mb-5'>Uploading Files</p>
            <div className='w-full flex flex-nowrap justify-center items-center '>
                {/* <div className='flex items-center space-x-2'>
                    <span className='text-lg'><AiOutlineFile /></span>
                    <span className='whitespace-nowrap'>File Name</span>
                </div>
                <div className='flex  justify-between items-center space-x-3 w-1/3'>
                    <div className="  rounded h-2 w-full bg-neutral-200 ">
                        <div className="h-2 bg-blue-500 rounded duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className='text-lg'>
                        <RxCross2 />
                    </span>
                </div> */}
                {
                    isUploading && <div className='text-blue-500 items-center justify-center text-center'>
                        <span className='flex justify-center items-center'>
                            <ImSpinner10 size={30} className='animate-spin' />
                        </span>
                        <p>Uploading...</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default UploadStatusContainer;