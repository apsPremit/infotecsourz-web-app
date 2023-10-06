import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';

const RadioButton = ({ label, isChecked, event }) => {
    const { customBackground } = useContext(StateContext)
    return (
        <div>
            <label className='inline-flex gap-x-1' htmlFor={label}>
                <input id={label}
                    className='accent-main scale-110'
                    type="radio"
                    checked={isChecked}
                    onChange={event}
                />
                <span className='text-sm'>{label === 'custom color' && customBackground ? customBackground : label}</span>

            </label>
        </div>
    );
};

export default RadioButton;