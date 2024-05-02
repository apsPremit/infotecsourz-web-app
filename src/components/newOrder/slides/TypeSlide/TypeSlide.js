import React, { useContext } from 'react';
import shoes from '@/assets/images/shoes-bg.jpg';
import Image from 'next/image';
import modelBasic from '../../../../assets/images/model/Beauty Makeup Retouching.png';
import productBasic from '../../../../assets/images/product/Color correction.png';
import { StateContext } from '@/context/StateProvider';

const TypeSlide = () => {
  const { photoType, setPhotoType } = useContext(StateContext);

  return (
    <>
      <h1 className='mb-3 text-xl font-bold '>Please Select Photo Type</h1>
      <div className='flex gap-5'>
        <div className='relative my-7 h-[220px] w-full bg-slate-50 lg:h-[300px] lg:w-[400px] '>
          <h1 className='absolute -top-8 text-lg font-bold'>Product Photo</h1>
          <label htmlFor='selectShoes'>
            <Image
              src={productBasic}
              alt='item'
              fill
              className=' cursor-pointer rounded-xl border  border-shadow h-full '
              style={{ objectFit: 'contain' }}
            />
            <input
              id='selectShoes'
              onChange={() => setPhotoType('product')}
              checked={photoType === 'product'}
              type='checkbox'
              className='absolute right-3 top-3 scale-150 accent-main'
            />
          </label>
        </div>
        <div className='relative my-7 h-[220px] w-full rounded-xl border bg-slate-50 border-shadow lg:h-[300px] lg:w-[400px] '>
          <h1 className='absolute -top-8 text-lg font-bold'>Model Photo</h1>
          <label htmlFor='selectModel'>
            <Image
              src={modelBasic}
              alt='item'
              fill
              className=' cursor-pointer rounded-xl'
              style={{ objectFit: 'contain' }}
            />
            <input
              id='selectModel'
              onChange={() => setPhotoType('model')}
              checked={photoType === 'model'}
              type='checkbox'
              className='absolute right-3 top-3 scale-150 accent-main'
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default TypeSlide;
