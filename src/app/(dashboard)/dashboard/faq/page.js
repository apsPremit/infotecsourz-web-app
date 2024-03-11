import FAQS from '@/components/dashboard/faq/FAQS/FAQS';
import React from 'react';
import faq from '../../../../../public/images/others/faq.png';
import Image from 'next/image';
export const metadata = {
  title: 'FAQ | Infotecsourz',
  description: 'Photo Retouching App',
};
const page = () => {
  return (
    <div className='mt-5 grid grid-cols-1 gap-5 rounded bg-white p-5 lg:grid-cols-2 lg:px-10'>
      <div className='flex flex-col'>
        <div className='flex-1'>
          <p>FAQ</p>
          <h1 className='mb-5 mt-3 text-5xl font-bold'>
            Frequently asked questions
          </h1>
          <p className=''>
            We may or may not be from the future. Here are the questions you
            were just about to ask us.
          </p>
        </div>
        <div className='flex '>
          <Image src={faq} width={500} height={400} alt='Faq image' />
        </div>
      </div>
      <div className='w-full'>
        <FAQS />
      </div>
    </div>
  );
};

export default page;
