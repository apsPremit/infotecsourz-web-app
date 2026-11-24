'use client';
import React, { useEffect, useMemo, useState } from 'react';
import NewOrderTab from './NewOrderTab/NewOrderTab';
import Slider from './Slider/Slider';
import Loader from '../shared/Loader/Loader';

const NewOrderPage = () => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const images = useMemo(
    () => [
      {
        name: 'productImage',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Product%20retouching.png',
      },
      {
        name: 'modelImage',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Noise%20remove.png',
      },
      {
        name: 'modelMakeup',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Beauty%20Makeup%20Retouching%20(2).png',
      },
      {
        name: 'modelMasking',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Masking.png',
      },
      {
        name: 'modelPimpleRemove',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Pimples,%20blemishes%20remove%20from%20face%20and%20skin.png',
      },
      {
        name: 'modelClithFixing',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Cloth%20&%20Shoe%20fixing.png',
      },
      {
        name: 'modelClipping',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Clipping%20path.png',
      },
      {
        name: 'modelBodyShaping',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Body%20shaping.png',
      },
      {
        name: 'modelColorCorrection',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Color%20correction.png',
      },
      {
        name: 'modelTeethAndRedEye',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/model/Eye%20Retoching.png',
      },
      {
        name: 'productNaturalShadow',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Natural%20shadow.png',
      },
      {
        name: 'productReflectionShadow',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Reflection%20shadow.png',
      },
      {
        name: 'productMasking',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Masking.png',
      },
      {
        name: 'productBasicClipping',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/clipping%20path.png',
      },
      {
        name: 'productMultipleClipping',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Multiple%20clipping%20path.png',
      },
      {
        name: 'productColorCorrection',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Color%20correction.png',
      },
      {
        name: 'productGhostMannequin',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Product%20retouching.png',
      },
      {
        name: 'productRetouching',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Product%20retouching.png',
      },
      {
        name: 'productColorVariant',
        url: 'https://pub-da46853260144bf6a37d018115493205.r2.dev/model-product/product/Color%20chnaging.png',
      },
    ],
    []
  );

  useEffect(() => {
    let loadedImagesCount = 0;

    const handleImageLoad = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        setImageLoaded(true);
      }
    };

    images.forEach((image) => {
      const img = new Image();
      img.src = image.url;
      img.onload = handleImageLoad;
    });
  }, [images]);

  return (
    <div>
      {isImageLoaded ? (
        <div>
          <NewOrderTab />
          <Slider />
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
