import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import productImage from '../../../../assets/images/product/Product retouching.png';
import modelImage from '../../../../assets/images/model/Noise remove.png';
import modelMakeup from '../../../../assets/images/model/Beauty Makeup Retouching.png';
import modelClithFixing from '../../../../assets/images/model/Cloth & Shoe fixing.png';
import modelClipping from '../../../../assets/images/model/Clipping path.png';
import modelBodyShaping from '../../../../assets/images/model/Body shaping copy.png';
import modelColorCorrection from '../../../../assets/images/model/Color correction.png';
import modelTeethAndRedEye from '../../../../assets/images/model/Eye Retoching.png';
import productNaturalShadow from '../../../../assets/images/product/Natural shadow.png';
import productReflectionShadow from '../../../../assets/images/product/Reflection shadow.png';
import productMasking from '../../../../assets/images/product/Masking.png';
import productBasicClipping from '../../../../assets/images/product/clipping path.png';
import productMultipleClipping from '../../../../assets/images/product/Multiple clipping path.png';
import productColorCorrection from '../../../../assets/images/product/Color correction.png';
import productGhostMannequin from '../../../../assets/images/product/Product retouching.png';
import productRetouching from '../../../../assets/images/product/Product retouching.png';
import productColorVariant from '../../../../assets/images/product/Color chnaging.png';

import { StateContext } from '@/context/StateProvider';

const ImageBox = () => {
  const {
    photoType,
    setPhotoType,
    backgroundColor,
    customBackground,
    alignments,
    openOptions,
    currentSlide,
    modelFinalSpecs,
    productFinalSpecs,
  } = useContext(StateContext);
  const [modelUpdatedProperty, setModelUpdatedProperty] = useState(null);
  const [productUpdatedProperty, setProductUpdateProperty] = useState(null);

  let modelPreviousRef = useRef(modelFinalSpecs);
  const modelNewChangeRef = useRef([]);

  let productPreviousRef = useRef(productFinalSpecs);
  const productNewChangeRef = useRef([]);

  //    modal image setting

  useEffect(() => {
    // find changed property
    const changedProperty = Object.keys(modelFinalSpecs).filter(
      (key) => modelFinalSpecs[key] !== modelPreviousRef.current[key]
    );

    const changedPropertyValue = modelFinalSpecs[changedProperty[0]];
    const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue };

    if (changedPropertyValue === true) {
      // If the property changed to true, set updatedProperty to the current changed property
      setModelUpdatedProperty(changedProperty[0]);
    } else if (
      changedPropertyValue === false &&
      modelPreviousRef.current[changedProperty[0]] === true
    ) {
      // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
      setModelUpdatedProperty(
        modelNewChangeRef.current[modelNewChangeRef.current.length - 2] || ''
      );
    }

    // Update the previousRef and newChangeRef
    modelPreviousRef.current = {
      ...modelPreviousRef.current,
      ...changedPropertyPair,
    };
    modelNewChangeRef.current.push(changedProperty[0]);
  }, [modelFinalSpecs]);

  // product image setting
  useEffect(() => {
    // find changed property
    const changedProperty = Object.keys(productFinalSpecs).filter(
      (key) => productFinalSpecs[key] !== productPreviousRef.current[key]
    );

    const changedPropertyValue = productFinalSpecs[changedProperty[0]];
    const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue };

    if (changedPropertyValue === true) {
      // If the property changed to true, set updatedProperty to the current changed property
      setProductUpdateProperty(changedProperty[0]);
    } else if (
      changedPropertyValue === false &&
      productPreviousRef.current[changedProperty[0]] === true
    ) {
      // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
      setProductUpdateProperty(
        productNewChangeRef.current[productNewChangeRef.current.length - 2] ||
          ''
      );
    }

    // Update the previousRef and newChangeRef
    productPreviousRef.current = {
      ...productPreviousRef.current,
      ...changedPropertyPair,
    };
    productNewChangeRef.current.push(changedProperty[0]);
  }, [productFinalSpecs]);

  return (
    <div
      className={`min-h[350px] relative mx-auto mb-3  w-full rounded-lg border border-shadow lg:min-h-fit  lg:w-full`}
      style={{
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
          alignments.verticalAlignment == 'top'
            ? 'start'
            : alignments.verticalAlignment == 'bottom'
              ? 'end'
              : 'center',
        alignItems:
          alignments.horizontalAlignment == 'left'
            ? 'start'
            : alignments.horizontalAlignment == 'right'
              ? 'end'
              : 'center', // Center horizontally
      }}
    >
      <p className='absolute top-1 right-1 text-sm text-red-500'>sample</p>
      <Image
        src={
          photoType === 'product'
            ? productUpdatedProperty == 'naturalShadow'
              ? productNaturalShadow
              : productUpdatedProperty == 'reflectionShadow'
                ? productReflectionShadow
                : productUpdatedProperty == 'masking'
                  ? productMasking
                  : productUpdatedProperty == 'basicClipping'
                    ? productBasicClipping
                    : productUpdatedProperty == 'multipleClipping'
                      ? productMultipleClipping
                      : productUpdatedProperty == 'colorCorrection'
                        ? productColorCorrection
                        : productUpdatedProperty == 'ghostMannequin'
                          ? productGhostMannequin
                          : productUpdatedProperty == 'productRetouching'
                            ? productRetouching
                            : productUpdatedProperty == 'colorVariant'
                              ? productColorVariant
                              : productImage
            : modelUpdatedProperty == 'beautyMakeup'
              ? modelMakeup
              : modelUpdatedProperty === 'clothFixing'
                ? modelClithFixing
                : modelUpdatedProperty === 'clipping'
                  ? modelClipping
                  : modelUpdatedProperty === 'colorCorrection'
                    ? modelColorCorrection
                    : modelUpdatedProperty === 'bodyShaping'
                      ? modelBodyShaping
                      : modelUpdatedProperty === 'pimplesRemove'
                        ? modelMakeup
                        : modelUpdatedProperty === 'wrinklesRemove'
                          ? modelColorCorrection
                          : modelUpdatedProperty === 'teethRetouching'
                            ? modelTeethAndRedEye
                            : modelUpdatedProperty === 'hairFixing'
                              ? modelMakeup
                              : modelUpdatedProperty === 'redEyeFixing'
                                ? modelTeethAndRedEye
                                : modelUpdatedProperty === 'masking'
                                  ? modelMakeup
                                  : modelUpdatedProperty === 'default'
                                    ? modelImage
                                    : modelImage
        }
        alt='item'
        fil='true'
        className={`max-h[350px] mx-auto rounded-xl ${
          (currentSlide === 5 || currentSlide === 6) && 'border border-main'
        }`}
        height={
          currentSlide === 5 || (currentSlide === 6 && alignments?.ratio)
            ? 400
            : 0
        }
        width={
          currentSlide === 5 || (currentSlide === 6 && alignments?.ratio)
            ? 400
            : 0
        }
        style={{
          maxHeight: '350px',
          position: currentSlide === 5 && 'absolute',
          objectFit: 'contain',
          padding: alignments.marginOverall && alignments.marginOverall + '%',
          paddingTop: alignments.marginTop && alignments.marginTop + '%',
          paddingBottom:
            alignments.marginBottom && alignments.marginBottom + '%',
          paddingLeft: alignments.marginLeft && alignments.marginLeft + '%',
          paddingRight: alignments.marginRight && alignments.marginRight + '%',
        }}
      />
    </div>
  );
};

export default ImageBox;
