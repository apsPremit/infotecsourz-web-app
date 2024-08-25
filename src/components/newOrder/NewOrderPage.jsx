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
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png',
      },
      {
        name: 'modelImage',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Noise%20remove.png',
      },
      {
        name: 'modelMakeup',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Beauty%20Makeup%20Retouching.png',
      },
      {
        name: 'modelClithFixing',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Cloth%20&%20Shoe%20fixing.png',
      },
      {
        name: 'modelClipping',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Clipping%20path.png',
      },
      {
        name: 'modelBodyShaping',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Body%20shaping.png',
      },
      {
        name: 'modelColorCorrection',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Color%20correction.png',
      },
      {
        name: 'modelTeethAndRedEye',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/model/Eye%20Retoching.png',
      },
      {
        name: 'productNaturalShadow',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Natural%20shadow.png',
      },
      {
        name: 'productReflectionShadow',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Reflection%20shadow.png',
      },
      {
        name: 'productMasking',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Masking.png',
      },
      {
        name: 'productBasicClipping',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/clipping%20path.png',
      },
      {
        name: 'productMultipleClipping',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Multiple%20clipping%20path.png',
      },
      {
        name: 'productColorCorrection',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20correction.png',
      },
      {
        name: 'productGhostMannequin',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png',
      },
      {
        name: 'productRetouching',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png',
      },
      {
        name: 'productColorVariant',
        url: 'https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20chnaging.png',
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
