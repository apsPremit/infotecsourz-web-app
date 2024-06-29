'use client';
import { StateContext } from '@/context/StateProvider';
import { useContext } from 'react';

const InputField = ({ label, event, disabled, valueField }) => {
  const { alignments } = useContext(StateContext);

  return (
    <div>
      <label className='relative' htmlFor=''>
        <span className='mb-2 block text-sm font-semibold text-black'>
          {label}
        </span>
        <input
          disabled={disabled}
          onChange={event}
          value={alignments[valueField]}
          type='text'
          className='w-full rounded border border-main px-3 py-1.5 text-sm outline-0 focus:border-main disabled:border-shadow'
        />
        <span className='absolute right-3 top-9 bg-white px-2 text-sm'>%</span>
      </label>
    </div>
  );
};

export default InputField;
