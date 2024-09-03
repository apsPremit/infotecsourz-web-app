'use client';
import { twMerge } from 'tailwind-merge';

const UncancelModal = ({ className, children, isOpen, setOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      id='modalWrapper'
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
    >
      <div className={twMerge(`bg-white w-[600px] rounded`, className)}>
        <div className='p-5'>{children}</div>
      </div>
    </div>
  );
};

export default UncancelModal;
