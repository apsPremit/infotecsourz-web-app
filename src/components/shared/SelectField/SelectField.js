import React from 'react';

const SelectField = ({
  options,
  label,
  event,
  defaultValue,
  value,
  disabled,
}) => {
  return (
    <div className='w-full'>
      <label className='w-full' htmlFor=''>
        <span className='mb-2 block text-sm font-semibold text-black'>
          {label}
        </span>
        <select
          disabled={disabled}
          onChange={event}
          value={value || defaultValue}
          className='w-full rounded border border-main px-3 py-1.5 text-sm font-light accent-main outline-0 focus:border-main'
          name=''
          id=''
        >
          <option value={defaultValue} className='text-sm'>
            {defaultValue}
          </option>

          {options.map((item) => (
            <option key={item?.id} value={item?.value} className='text-sm'>
              {item?.title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectField;
