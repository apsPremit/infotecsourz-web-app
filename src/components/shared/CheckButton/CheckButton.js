import React from 'react';

const CheckButton = ({ isChecked, toggleCheckbox, label }) => {

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="hidden"
                checked={isChecked}
                onChange={toggleCheckbox}
            />
            <div className={`w-3.5 h-3.5 border border-main rounded-full flex items-center justify-center ${isChecked ? 'bg-main' : 'bg-white'}`}>
                {isChecked && (
                    <svg
                        className={`w-2.5 h-2.5 ${isChecked ? 'text-white' : 'text-black'} fill-current`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>
            <span className="ml-2 text-sm">{label}</span>
        </label>
    );
};

export default CheckButton;