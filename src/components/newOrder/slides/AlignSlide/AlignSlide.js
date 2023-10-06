import React, { useContext } from 'react';
import SlideFoot from '@/components/newOrder/slides/SlideFoot/SlideFoot';
import ImageBox from '@/components/newOrder/slides/ImageBox/ImageBox';
import SelectField from '@/components/shared/SelectField/SelectField';
import InputField from '@/components/shared/InputFiled/InputField';
import TabButton from '@/components/shared/TabButton/TabButton';
import { StateContext } from '@/context/StateProvider';

const AlignSlide = () => {

    const { openOptions, setOpenOptions, handleSingleValueChange, alignments, setAlignments } = useContext(StateContext)



    const ratioOptions = [
        { id: 1, value: '1/1', title: '1:1 (square)' },
        { id: 2, value: '2/3', title: '2:3 (portrait)' },
        { id: 3, value: '3/2', title: '3:2 (landscape)' },
        { id: 4, value: '16/9', title: '16:9 (widescreen)' },
    ]
    const horizontalAlignOptions = [
        { id: 1, value: 'left', title: 'Left' },
        { id: 2, value: 'center', title: 'Center' },
        { id: 3, value: 'right', title: 'Right' }

    ]

    const verticalAlignOptions = [
        { id: 1, value: 'top', title: 'Top' },
        { id: 2, value: 'center', title: 'Center' },
        { id: 3, value: 'bottom', title: 'Bottom' }

    ]

    const toggleCropAndMargin = () => {
        if (openOptions.isOpenCrop) {
            setOpenOptions((prevOptions) => ({
                ...prevOptions,
                isOpenCrop: false,
                isOpenMargin: true,
            }));
        } else {
            setOpenOptions((prevOptions) => ({
                ...prevOptions,
                isOpenCrop: true,
                isOpenMargin: false,
            }));
        }
    };


    const handleInputChange = (e, inputName) => {
        const ignoreValues = ['Select horizontal alignment', 'Select vertical alignment', 'Select aspect ratio']
        const value = ignoreValues.includes(e.target.value) ? '' : e.target.value;
        handleSingleValueChange(setAlignments, inputName, value)
    }

    return (
        <div>

            <h2 className='text-xl  font-bold '>Align your photo </h2>
            <div className='lg:flex  gap-5 w-full '>
                <ImageBox />
                {/* rightside  */}
                <div className="w-full  lg:w-1/3 mt-7">
                    <div className='flex gap-x-5 items-center'>
                        <TabButton
                            title='Crop'
                            id={1}
                            event={toggleCropAndMargin}
                            isActive={openOptions["isOpenCrop"]}
                            padding_x='2'
                            padding_y='1'
                            text_size='xs'
                        />

                        <TabButton
                            title='Margin'
                            id={2}
                            event={toggleCropAndMargin}
                            isActive={openOptions["isOpenMargin"]}
                            padding_x='2'
                            padding_y='1'
                            text_size='xs'
                        />
                    </div>

                    {
                        openOptions['isOpenCrop'] ? <div>
                            {/* aspect ratio */}
                            <div className='my-8'>  <SelectField
                                event={(e) => handleInputChange(e, 'ratio')}
                                label='Select an aspect ratio'
                                options={ratioOptions}
                                defaultValue="Select aspect ratio"
                                value={alignments.ratio}
                                valueField='ratio'
                                disabled={openOptions?.isOriginalAspect}
                            />
                            </div>
                            {/* Horizontal alignment */}
                            <div className='my-8'>  <SelectField
                                event={(e) => handleInputChange(e, 'horizontalAlignment')}
                                label='Horizontal Alignment'
                                options={horizontalAlignOptions}
                                defaultValue="Select horizontal alignment"
                                value={alignments.horizontalAlignment}
                                valueField='horizontalAlignment'
                                disabled={openOptions?.isOriginalAspect}
                            />
                            </div>
                            {/* vertical alignment */}
                            <div className='my-8'>  <SelectField
                                event={(e) => handleInputChange(e, 'verticalAlignment')}
                                label='Vertical Alignment'
                                options={verticalAlignOptions}
                                defaultValue="Select vertical alignment"
                                value={alignments.verticalAlignment}
                                valueField='verticalAlignment'
                                disabled={openOptions?.isOriginalAspect}
                            />
                            </div>
                            <div>
                                <label className='cursor-pointer' htmlFor="kepOriginal">
                                    <input
                                        id='kepOriginal'
                                        onChange={() => handleSingleValueChange(setOpenOptions, 'isOriginalAspect', !openOptions.isOriginalAspect)}
                                        type="checkbox"
                                        className='mr-2 accent-main'
                                        checked={openOptions.isOriginalAspect}
                                    />
                                    <span>Keep original aspect ratio</span>
                                </label>
                            </div>
                        </div>
                            :
                            <div>
                                {/* overall margin  */}
                                <div className='mt-5 mb-5'> <InputField
                                    disabled={openOptions['isOpenCustomMargin']}
                                    event={(e) => handleInputChange(e, 'marginOverall')}
                                    label='Overall margin'
                                    valueField='marginOverall'

                                /></div>
                                {/* custom margin  */}
                                <div>
                                    <label htmlFor="">
                                        <input
                                            onChange={() => handleSingleValueChange(setOpenOptions, 'isOpenCustomMargin', !openOptions['isOpenCustomMargin'])}
                                            checked={openOptions.isOpenCustomMargin}
                                            type="checkbox" className='mr-2 accent-main' />
                                        <span>Use custom margin</span>
                                    </label>
                                </div>

                                {/* margin parts  */}
                                {
                                    openOptions['isOpenCustomMargin'] && <div className='grid gap-3 grid-cols-2 my-5'>
                                        <div>
                                            <InputField
                                                label='Top'
                                                event={(e) => handleInputChange(e, 'marginTop')}
                                                valueField='marginTop'

                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                label='Bottom'
                                                event={(e) => handleInputChange(e, 'marginBottom')}
                                                valueField='marginBottom'
                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                label='Left'
                                                event={(e) => handleInputChange(e, 'marginLeft')}
                                                valueField='marginLeft'
                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                label='Right'
                                                event={(e) => handleInputChange(e, 'marginRight')}
                                                valueField='marginRight'
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default AlignSlide;