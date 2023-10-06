import React, { useContext } from 'react';
import shoes from '@/assets/images/shoes-bg.jpg'
import Image from 'next/image';
import modelBasic from '../../../../../public/images/model/First Image Basic.jpg'
import productBasic from '../../../../../public/images/product/Transparent.png'
import { StateContext } from '@/context/StateProvider';

const TypeSlide = () => {
    const { photoType, setPhotoType } = useContext(StateContext)


    return (
        <div className='flex gap-5'>
            <div className='relative w-full lg:w-[400px] h-[220px] lg:h-[300px] bg-[#eee7e7] my-7 '>
                <h1 className='absolute -top-8 font-bold text-lg'>Product Photo</h1>
                <label htmlFor="selectShoes">

                    <Image src={productBasic} alt='item'
                        fill
                        className=' rounded-xl object-contain cursor-pointer  border border-shadow'


                    />
                    <input
                        id='selectShoes'
                        onChange={() => setPhotoType('product')}
                        checked={photoType === 'product'}
                        type="checkbox"
                        className='absolute top-3 right-3 scale-150 accent-main'
                    />
                </label>
            </div>
            <div className='relative w-full lg:w-[400px] h-[220px] lg:h-[300px] border border-shadow rounded-xl my-7 '>
                <h1 className='absolute -top-8 font-bold text-lg'>Model Photo</h1>
                <label htmlFor="selectModel">
                    <Image src={modelBasic} alt='item'
                        fill
                        className=' rounded-xl cursor-pointer'

                    />
                    <input
                        id='selectModel'
                        onChange={() => setPhotoType('model')}
                        checked={photoType === 'model'}
                        type="checkbox"
                        className='absolute top-3 right-3 scale-150 accent-main'
                    />
                </label>
            </div>

        </div>
    );
};

export default TypeSlide;