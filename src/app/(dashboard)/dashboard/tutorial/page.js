import config from '@/config';
import React from 'react';

const page = () => {
  return (
    <div className='min-h-screen'>
      <h3 className='text-3xl font-bold text-center mt-5'>
        How Can I Make Order
      </h3>
      <p className='text-center mt-2 mb-5'>
        Create Your account,update your images.define your image-editing needs
        and relax.
      </p>
      <div className='flex justify-center my-10'>
        <iframe
          width='560'
          height='315'
          src={config.tutorial_link}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default page;
