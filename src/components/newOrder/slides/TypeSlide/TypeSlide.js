import React, { useContext, useEffect } from 'react';
import shoes from '@/assets/images/shoes-bg.jpg';
import Image from 'next/image';
// import modelBasic from '../../../../assets/images/model/Beauty Makeup Retouching.png';
// import productBasic from '../../../../assets/images/product/Color correction.png';
import { StateContext } from '@/context/StateProvider';
import SwitchToggle from '@/components/ui/SwitchToggle';

const TypeSlide = () => {
  const { photoType, setPhotoType } = useContext(StateContext);
  const modelBasic =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Beauty%20Makeup%20Retouching.png';
  const productBasic =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20correction.png';
  return (
    <>
      <h1 className='mb-3 text-xl font-bold '>Please Select Photo Type</h1>
      <div className='flex gap-5'>
        <div className='relative my-7 h-[220px] w-full bg-slate-50 lg:h-[300px] lg:w-[400px] '>
          <h1 className='absolute -top-8 text-lg font-bold'>Product Photo</h1>
          <label onClick={() => setPhotoType('product')} htmlFor='selectShoes'>
            <Image
              src={productBasic}
              alt='item'
              fill
              className={`cursor-pointer rounded-xl border  ${
                photoType == 'product' ? 'border-main border-2' : ''
              }`}
              style={{ objectFit: 'contain' }}
            />
          </label>
          <div className='absolute -bottom-10 left-5'>
            <SwitchToggle
              id='selectShoes'
              toggler={() => setPhotoType('product')}
              isChecked={photoType === 'product'}
              label='Product'
            />
          </div>
        </div>
        <div className='relative my-7 h-[220px] w-full rounded-xl border bg-slate-50 border-shadow lg:h-[300px] lg:w-[400px] '>
          <h1 className='absolute -top-8 text-lg font-bold'>Model Photo</h1>
          <label onClick={() => setPhotoType('model')} htmlFor='selectModel'>
            <Image
              src={modelBasic}
              alt='item'
              fill
              className={`cursor-pointer rounded-xl border  ${
                photoType == 'model' ? 'border-main border-2' : ''
              }`}
              style={{ objectFit: 'contain' }}
            />
          </label>
          <div className='absolute -bottom-10 left-5'>
            <SwitchToggle
              id='selectModel'
              toggler={() => setPhotoType('model')}
              isChecked={photoType === 'model'}
              label='Model'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeSlide;
