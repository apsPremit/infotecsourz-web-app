
import React from 'react';
import image from '../../../../public/icons/image.png'
import questionMark from '../../../../public/icons/question_mark.png'
import message from '../../../../public/icons/message.png'
import Image from 'next/image';
import { BsImageAlt } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { RxDotFilled } from "react-icons/rx";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { baseUrl } from '@/utils/functions/baseUrl';
import getOrders from '@/utils/functions/getOrders';
import BtnFreeTrial from '@/components/dashboard/dashboard/BtnFreeTrial/BtnFreeTrial';
import OrderTable from '@/components/dashboard/dashboard/OrderTable/OrderTable';
import SubscribedPackage from '@/components/dashboard/dashboard/SubscribedPackage/SubscribedPackage';



const page = () => {





    // redirect('/dashboard/upload')
    return (
        <div className='lg:p-10  bg-[#F5F5F5] '>
            {/* title  */}
            {/* <div className='bg-[#633FE8] p-5 rounded-lg lg:grid grid-cols-2 items-center mb-10'>
                <div className=''>
                    <h1 className='text-xl text-white'>Welcome, <span className='text-white'></span> </h1>
                    <p className='text-white  mt-3 text-sm lg:text-md'>Step into a world of image perfection with our  services</p>
                </div>

                <div className='lg:flex items-center gap-x-5 '>
                    <div className='my-5'>
                        <div className='flex justify-between my-3 lg:my-0  lg:gap-x-12 w-full '>
                            <span className='text-sm text-white'>Complete your profile</span>
                            <span className='text-white text-sm'>60% Completed</span>
                        </div>
                        <div className=" mt-2 rounded h-1 w-full bg-neutral-200 ">
                            <div className="h-1 bg-[#29FF5F]" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                    <Link href='/dashboard/profile'>
                        <button className='bg-white  text-main border-main rounded px-2 py-1.5 whitespace-nowrap'>Complete Now</button>
                    </Link>
                </div>
            </div> */}
            {/* title end  */}



            <SubscribedPackage />

            <div className='lg:grid grid-cols-3  mx-auto lg:gap-5 space-y-5 lg:space-y-0'>



                <div className='border border-shadow p-5 rounded bg-white'>
                    <div className=''>
                        <p className='p-1.5 w-8 h-8 flex justify-center items-center bg-green-200 text-green-500 text-xl border border-red-20 rounded-full'>
                            <BsImageAlt className='' />
                        </p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-bold  text-lg'>$30</p>
                        <h3 className='text  text-[#9f9f9f] text-sm'>Get $20 for Free trial!</h3>
                        <BtnFreeTrial />
                    </div>
                </div>
                <div className='border border-shadow p-5 rounded bg-white'>
                    <div className=''>
                        <p className='p-1.5 w-8 h-8 flex justify-center items-center bg-orange-200 text-orange-500 text-xl border border-red-20 rounded-full'>
                            <AiOutlineQuestionCircle className='' />
                        </p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-bold  text-lg'>Have a Question</p>
                        <h3 className='text  text-[#9f9f9f] text-sm'>Contact us or find your answer in FAQ</h3>
                        <Link href='/dashboard/faq'>
                            <button className='px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover'>Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div className='border border-shadow p-5 rounded bg-white'>
                    <div className=''>
                        <p className='p-1.5 w-8 h-8 flex justify-center items-center bg-pink-200 text-pink-500 text-xl border border-red-20 rounded-full'>
                            < LuMessagesSquare className='' />
                        </p>
                    </div>
                    <div className='mt-3 '>
                        <p className='font-bold  text-lg'>Need Support</p>
                        <h3 className='text  text-[#9f9f9f] text-sm'>Facing any issue can get support</h3>
                        <Link href='/dashboard/support'>
                            <button className='px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover  '>Support</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* 
            <div className='flex justify-between items-center my-10 border p-5 bg-white'>
                <div className=''>
                    <h3 className='text-yellow-500 font-bold flex gap-x-2 items-center'><span className='text-yellow-500 text-lg'><RiErrorWarningFill /></span>Attention Needed</h3>
                    <p className='text-yellow-500 text-sm'>You have already used 7 of 10 free trial images. You have 3 free trial images left.</p>
                </div>
                <Link href='/dashboard/pricing'>
                    <button className='px-3 py-1.5 bg-main hover:bg-mainHover whitespace-nowrap text-white rounded'>Get Premium</button>
                </Link>

            </div> */}



            {/* recent orders  */}
            <h3 className='bg-white p-5 w-full my-5 font-bold text-lg'>Recent Orders</h3>

            {/* table  */}
            <OrderTable />

            {/* notification  */}



        </div>

    );
};

export default page;