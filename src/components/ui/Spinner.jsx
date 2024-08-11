import React from 'react';
import { ImSpinner3 } from 'react-icons/im';
const Spinner = () => {
  return (
    <span className='flex justify-center'>
      <ImSpinner3 size={18} className='animate-spin' />
    </span>
  );
};

export default Spinner;
