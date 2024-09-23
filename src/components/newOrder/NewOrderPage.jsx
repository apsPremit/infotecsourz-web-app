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
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Product%20retouching.png',
      },
      {
        name: 'modelImage',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Noise%20remove.png',
      },
      {
        name: 'modelMakeup',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Beauty%20Makeup%20Retouching%20(2).png',
      },
      {
        name: 'modelMasking',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Masking.png',
      },
      {
        name: 'modelPimpleRemove',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Pimples,%20blemishes%20remove%20from%20face%20and%20skin.png',
      },
      {
        name: 'modelClithFixing',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Cloth%20&%20Shoe%20fixing.png',
      },
      {
        name: 'modelClipping',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Clipping%20path.png',
      },
      {
        name: 'modelBodyShaping',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Body%20shaping.png',
      },
      {
        name: 'modelColorCorrection',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Color%20correction.png',
      },
      {
        name: 'modelTeethAndRedEye',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/model/Eye%20Retoching.png',
      },
      {
        name: 'productNaturalShadow',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Natural%20shadow.png',
      },
      {
        name: 'productReflectionShadow',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Reflection%20shadow.png',
      },
      {
        name: 'productMasking',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Masking.png',
      },
      {
        name: 'productBasicClipping',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/clipping%20path.png',
      },
      {
        name: 'productMultipleClipping',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Multiple%20clipping%20path.png',
      },
      {
        name: 'productColorCorrection',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Color%20correction.png',
      },
      {
        name: 'productGhostMannequin',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Product%20retouching.png',
      },
      {
        name: 'productRetouching',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Product%20retouching.png',
      },
      {
        name: 'productColorVariant',
        url: 'https://infotec-app-image-model-product.nyc3.cdn.digitaloceanspaces.com/product/Color%20chnaging.png',
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
