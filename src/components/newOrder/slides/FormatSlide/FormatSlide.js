import React, { useContext } from 'react';
import ImageBox from '@/components/newOrder/slides/ImageBox/ImageBox';
import SlideFoot from '../SlideFoot/SlideFoot';
import RadioButton from '@/components/shared/RadioButton/RadioButton';
import { StateContext } from '@/context/StateProvider';
import CheckButton from '@/components/shared/CheckButton/CheckButton';

const FormatSlide = () => {
    const { formats, setFormats, handleSingleValueChange } = useContext(StateContext)
    const formatOptions = [
        { label: 'JPEG', value: 'jpeg' },
        { label: 'PNG', value: 'png' },
        { label: 'TIFF', value: 'tiff' },
        { label: 'PSD', value: 'psd' },
    ]



    return (
        <div>
            <h2 className='text-xl  font-bold mb-5'>Select Image format </h2>

            <ImageBox />
            <div className='flex items-center gap-x-10'>
                {/* {
                    formatOptions.map((item, i) => <RadioButton
                        key={i}
                        event={() => handleSingleValueChange(setFormats, item.value, !formats[item.value])}
                        label={item.label}
                        isChecked={formats[item.value]}
                    />)
                } */}
                {
                    formatOptions.map((item, i) => <CheckButton
                        key={i}
                        isChecked={formats[item.value]}
                        toggleCheckbox={() => handleSingleValueChange(setFormats, item.value, !formats[item.value])}
                        label={item.label}
                    />)
                }
            </div>
        </div>
    );
};

export default FormatSlide;