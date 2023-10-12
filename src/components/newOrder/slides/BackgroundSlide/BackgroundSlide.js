import React, { useContext } from 'react';
import ImageBox from '../ImageBox/ImageBox';
import RadioButton from '@/components/shared/RadioButton/RadioButton';
import SlideFoot from '../SlideFoot/SlideFoot';
import { StateContext } from '@/context/StateProvider';
import { SketchPicker } from 'react-color';

const BackgroundSlide = () => {
    const { backgroundColor, setBackgroundColor, openOptions, setCustomBackground } = useContext(StateContext)



    const backgroundOptions = [
        { title: 'White', value: 'white' },
        { title: 'Transparent', value: 'transparent' },
        { title: 'Keep original background', value: 'original' },
        { title: 'custom color', value: 'custom' },
    ]

    const handleColorChange = (color) => {
        setCustomBackground(color?.hex)
    }


    return (
        <div className='relative'>

            <ImageBox />
            <h2 className='text-lg  font-bold mb-5'>Choose a background </h2>
            <div className='flex items-center gap-x-10 flex-wrap'>
                {
                    backgroundOptions.map((item, i) => <RadioButton
                        event={() => setBackgroundColor(item.value)}
                        key={i}
                        label={item.title}
                        isChecked={item?.value === backgroundColor}
                    />)
                }
                {
                    backgroundColor === 'custom' && <div className='absolute -right-10 top-0'>
                        <SketchPicker
                            onChange={handleColorChange}
                            color={backgroundColor}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default BackgroundSlide;