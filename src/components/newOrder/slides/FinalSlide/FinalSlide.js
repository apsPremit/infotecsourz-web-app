import React, { useContext } from 'react';
import ImageBox from '../ImageBox/ImageBox';
import SlideFoot from '../SlideFoot/SlideFoot';
import RadioButton from '@/components/shared/RadioButton/RadioButton';
import { StateContext } from '@/context/StateProvider';
import CheckButton from '@/components/shared/CheckButton/CheckButton';
import SwitchToggle from '@/components/ui/SwitchToggle';

const FinalSlide = () => {
  const {
    productFinalSpecs,
    setProductFinalSpecs,
    handleSingleValueChange,
    modelFinalSpecs,
    setModelFinalSpecs,
    photoType,
  } = useContext(StateContext);

  const productFinalOptions = [
    { id: 1, value: 'naturalShadow', title: 'Natural shadow' },
    { id: 2, value: 'reflectionShadow', title: 'Reflection shadow' },
    { id: 3, value: 'masking', title: 'Keep mask' },
    { id: 4, value: 'basicClipping', title: 'Basic clipping path' },
    { id: 5, value: 'multipleClipping', title: 'Multiple clipping path' },
    { id: 6, value: 'ghostMannequin', title: 'Ghost mannequin' },
    { id: 7, value: 'productRetouching', title: 'Product retouching' },
    { id: 8, value: 'colorCorrection', title: 'Color correction' },
    { id: 9, value: 'colorVariant', title: 'Color Variant' },
    // todo confusion of color variant
  ];

  const modelFinalOptions = [
    { id: 1, value: 'beautyMakeup', title: 'Beauty Makeup Retouching ' },
    { id: 2, value: 'bodyShaping', title: 'Body shaping' },
    { id: 3, value: 'clipping', title: 'Clipping path' },
    { id: 4, value: 'clothFixing', title: 'Cloth fixing' },
    { id: 5, value: 'colorCorrection', title: 'Color correction' },
    { id: 6, value: 'hairFixing', title: 'Hair fixing' },
    { id: 7, value: 'masking', title: 'Masking' },
    { id: 8, value: 'noiseRemove', title: 'Noise remove' },
    { id: 9, value: 'pimplesRemove', title: 'Pimples, blemishes remove ' },
    {
      id: 10,
      value: 'redEyeFixing',
      title: 'Eye Retoching / Sunglass reflection remove',
    },
    { id: 11, value: 'teethRetouching', title: 'Teeth retouching' },
    { id: 12, value: 'wrinklesRemove', title: 'Wrinkles remove' },
  ];

  const handleClipping = () => {};

  return (
    <div>
      <ImageBox />
      <h2 className='mb-5  text-lg font-bold'>Give a final touch </h2>

      <div className='flex flex-wrap items-center gap-x-10'>
        {photoType === 'product' ? (
          <div className='grid grid-cols-2  gap-x-2 md:grid-cols-3'>
            {productFinalOptions.map((item, i) => (
              <SwitchToggle
                key={i}
                label={item.title}
                isChecked={productFinalSpecs[item.value]}
                toggler={() =>
                  handleSingleValueChange(
                    setProductFinalSpecs,
                    item.value,
                    !productFinalSpecs[item.value]
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-2 justify-between gap-x-2 md:grid-cols-3 md:justify-evenly  lg:justify-start lg:gap-x-0'>
            {modelFinalOptions.map((item, i) => (
              <SwitchToggle
                key={i}
                label={item.title}
                isChecked={modelFinalSpecs[item.value]}
                toggler={() =>
                  handleSingleValueChange(
                    setModelFinalSpecs,
                    item.value,
                    !modelFinalSpecs[item.value]
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalSlide;
