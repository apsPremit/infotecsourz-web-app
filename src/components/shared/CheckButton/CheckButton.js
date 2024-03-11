import React from 'react';

const CheckButton = ({ isChecked, toggleCheckbox, label }) => {
  return (
    <label className='inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        className='hidden'
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <div
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border border-main ${isChecked ? 'bg-main' : 'bg-white'}`}
      >
        {isChecked && (
          <svg
            className={`h-2.5 w-2.5 ${isChecked ? 'text-white' : 'text-black'} fill-current`}
            viewBox='0 0 20 20'
          >
            <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
          </svg>
        )}
      </div>
      <span className='ml-2 text-sm'>{label}</span>
    </label>
  );
};

export default CheckButton;
