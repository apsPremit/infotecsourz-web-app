import FAQS from '@/components/dashboard/faq/FAQS/FAQS'
import React from 'react';
import faq from '../../../../../public/images/others/faq.png'
import Image from 'next/image';

const page = () => {
    return (
        <div className='lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-5 rounded p-5 mt-5 bg-white'>
            <div className='flex flex-col'>
                <div className='flex-1'>
                    <p>FAQ</p>
                    <h1 className='text-5xl font-bold mb-5 mt-3'>Frequently asked questions</h1>
                    <p className=''>We may or may not be from the future. Here are the questions you were just about to ask us.</p>
                </div>
                <div className='flex '>
                    <Image
                        src={faq}
                        width={500}
                        height={400}
                        alt='Faq image'
                    />
                </div>
            </div>
            <div className='w-full'>
                <FAQS />
            </div>
        </div>
    );
};

export default page;