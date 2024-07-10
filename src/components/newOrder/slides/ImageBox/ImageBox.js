import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';

// import modelImage from '../../../../assets/images/model/Noise remove.png';
// import modelMakeup from '../../../../assets/images/model/Beauty Makeup Retouching.png';
// import modelClithFixing from '../../../../assets/images/model/Cloth & Shoe fixing.png';
// import modelClipping from '../../../../assets/images/model/Clipping path.png';
// import modelBodyShaping from '../../../../assets/images/model/Body shaping copy.png';
// import modelColorCorrection from '../../../../assets/images/model/Color correction.png';
// import modelTeethAndRedEye from '../../../../assets/images/model/Eye Retoching.png';
// import productNaturalShadow from '../../../../assets/images/product/Natural shadow.png';
// import productReflectionShadow from '../../../../assets/images/product/Reflection shadow.png';
// import productMasking from '../../../../assets/images/product/Masking.png';
// import productBasicClipping from '../../../../assets/images/product/clipping path.png';
// import productMultipleClipping from '../../../../assets/images/product/Multiple clipping path.png';
// import productColorCorrection from '../../../../assets/images/product/Color correction.png';
// import productGhostMannequin from '../../../../assets/images/product/Product retouching.png';
// import productRetouching from '../../../../assets/images/product/Product retouching.png';
// import productColorVariant from '../../../../assets/images/product/Color chnaging.png';

import { StateContext } from '@/context/StateProvider';

const ImageBox = () => {
  const productImage =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png';
  const modelImage =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Noise%20remove.png';
  const modelMakeup =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Beauty%20Makeup%20Retouching.png';
  const modelClithFixing =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Cloth%20&%20Shoe%20fixing.png';
  const modelClipping =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Clipping%20path.png';
  const modelBodyShaping =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Body%20shaping.png';
  const modelColorCorrection =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Color%20correction.png';
  const modelTeethAndRedEye =
    'https://d34n7qm7kfn7vw.cloudfront.net/model/Eye%20Retoching.png';
  const productNaturalShadow =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Natural%20shadow.png';
  const productReflectionShadow =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Reflection%20shadow.png';
  const productMasking =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Masking.png';
  const productBasicClipping =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/clipping%20path.png';
  const productMultipleClipping =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Multiple%20clipping%20path.png';
  const productColorCorrection =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20correction.png';
  const productGhostMannequin =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png';
  const productRetouching =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png';
  const productColorVariant =
    'https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20chnaging.png';

  const {
    photoType,
    backgroundColor,
    customBackground,
    alignments,
    currentSlide,
    modelFinalSpecs,
    productFinalSpecs,
  } = useContext(StateContext);

  const [modelUpdatedProperty, setModelUpdatedProperty] = useState(null);
  const [productUpdatedProperty, setProductUpdateProperty] = useState(null);

  const modelPreviousRef = useRef(modelFinalSpecs);
  const modelNewChangeRef = useRef([]);

  const productPreviousRef = useRef(productFinalSpecs);
  const productNewChangeRef = useRef([]);

  const findChangedProperty = (
    finalSpecs,
    previousRef,
    newChangeRef,
    setUpdateProperty
  ) => {
    const changedProperty = Object.keys(finalSpecs).find(
      (key) => finalSpecs[key] !== previousRef.current[key]
    );

    const changedPropertyValue = finalSpecs[changedProperty];
    const changedPropertyPair = { [changedProperty]: changedPropertyValue };

    if (changedPropertyValue === true) {
      setUpdateProperty(changedProperty);
    } else if (
      changedPropertyValue === false &&
      previousRef.current[changedProperty] === true
    ) {
      setUpdateProperty(
        newChangeRef.current[newChangeRef.current.length - 2] || ''
      );
    }

    previousRef.current = { ...previousRef.current, ...changedPropertyPair };
    newChangeRef.current.push(changedProperty);
  };

  useEffect(() => {
    findChangedProperty(
      modelFinalSpecs,
      modelPreviousRef,
      modelNewChangeRef,
      setModelUpdatedProperty
    );
  }, [modelFinalSpecs]);

  useEffect(() => {
    findChangedProperty(
      productFinalSpecs,
      productPreviousRef,
      productNewChangeRef,
      setProductUpdateProperty
    );
  }, [productFinalSpecs]);

  const getImageSrc = () => {
    if (photoType === 'product') {
      switch (productUpdatedProperty) {
        case 'naturalShadow':
          return productNaturalShadow;
        case 'reflectionShadow':
          return productReflectionShadow;
        case 'masking':
          return productMasking;
        case 'basicClipping':
          return productBasicClipping;
        case 'multipleClipping':
          return productMultipleClipping;
        case 'colorCorrection':
          return productColorCorrection;
        case 'ghostMannequin':
          return productGhostMannequin;
        case 'productRetouching':
          return productRetouching;
        case 'colorVariant':
          return productColorVariant;
        default:
          return productImage;
      }
    } else {
      switch (modelUpdatedProperty) {
        case 'beautyMakeup':
          return modelMakeup;
        case 'clothFixing':
          return modelClithFixing;
        case 'clipping':
          return modelClipping;
        case 'colorCorrection':
          return modelColorCorrection;
        case 'bodyShaping':
          return modelBodyShaping;
        case 'pimplesRemove':
          return modelMakeup;
        case 'wrinklesRemove':
          return modelColorCorrection;
        case 'teethRetouching':
          return modelTeethAndRedEye;
        case 'hairFixing':
          return modelMakeup;
        case 'redEyeFixing':
          return modelTeethAndRedEye;
        case 'masking':
          return modelMakeup;
        default:
          return modelImage;
      }
    }
  };

  const containerStyle = {
    backgroundColor:
      backgroundColor === 'original'
        ? ''
        : backgroundColor === 'custom'
          ? customBackground
          : backgroundColor,
    maxHeight: '700px',
    minHeight: '350px',
    aspectRatio: alignments?.ratio,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:
      alignments.verticalAlignment === 'top'
        ? 'start'
        : alignments.verticalAlignment === 'bottom'
          ? 'end'
          : 'center',
    alignItems:
      alignments.horizontalAlignment === 'left'
        ? 'start'
        : alignments.horizontalAlignment === 'right'
          ? 'end'
          : 'center',
  };

  const imageStyle = {
    maxHeight: '350px',
    position: currentSlide === 6 ? 'absolute' : 'relative',
    objectFit: 'contain',
    padding: alignments.marginOverall + '%',
    paddingTop: alignments.marginTop + '%',
    paddingBottom: alignments.marginBottom + '%',
    paddingLeft: alignments.marginLeft + '%',
    paddingRight: alignments.marginRight + '%',
  };

  return (
    <div
      className='min-h[350px] relative mx-auto mb-3 w-full rounded-lg border border-shadow lg:min-h-fit lg:w-full'
      style={containerStyle}
    >
      <p className='absolute top-1.5 left-1.5 text-sm text-black font-bold'>
        Preview Sample
      </p>
      <Image
        src={getImageSrc()}
        alt='item'
        // fill='true'
        className={`max-h[350px] mx-auto rounded-xl ${
          currentSlide === 6 || currentSlide === 7 ? 'border border-main' : ''
        }`}
        height={
          currentSlide === 6 || (currentSlide === 7 && alignments?.ratio)
            ? 400
            : 0
        }
        width={
          currentSlide === 6 || (currentSlide === 7 && alignments?.ratio)
            ? 400
            : 400
        }
        style={imageStyle}
        priority
      />
    </div>
  );
};

export default ImageBox;
