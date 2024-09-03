import React, { useContext } from 'react';
import ImageBox from '../ImageBox/ImageBox';
import RadioButton from '@/components/shared/RadioButton/RadioButton';
import SlideFoot from '../SlideFoot/SlideFoot';
import { StateContext } from '@/context/StateProvider';
import {
  BlockPicker,
  GithubPicker,
  PhotoshopPicker,
  SketchPicker,
} from 'react-color';
import SwitchToggle from '@/components/ui/SwitchToggle';
import Draggable from 'react-draggable';

const BackgroundSlide = () => {
  const {
    backgroundColor,
    setBackgroundColor,
    openOptions,
    setCustomBackground,
  } = useContext(StateContext);

  const backgroundOptions = [
    { title: 'White', value: 'white' },
    { title: 'Transparent', value: 'transparent' },
    { title: 'Keep original background', value: 'original' },
    { title: 'custom color', value: 'custom' },
  ];

  const handleColorChange = (color) => {
    setCustomBackground(color?.hex);
  };

  return (
    <div className='relative'>
      <div>
        <ImageBox />
        <h2 className='mb-5  text-lg font-bold'>Choose a background </h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 space-y-1.5'>
          {backgroundOptions.map((item, i) => (
            <SwitchToggle
              toggler={() => setBackgroundColor(item.value)}
              key={i}
              label={item.title}
              isChecked={item?.value === backgroundColor}
            />
          ))}
        </div>
      </div>

      {backgroundColor === 'custom' && (
        <Draggable handle='.drag-handle' cancel='.sketch-picker *'>
          <div className='absolute  top-0 -right-10 lg:-right-56  '>
            <div className='drag-handle cursor-move bg-gray-200 p-2 rounded-t text-center'>
              Drag
            </div>
            <SketchPicker
              className='sketch-picker'
              onChange={handleColorChange}
              color={backgroundColor}
            />
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default BackgroundSlide;
