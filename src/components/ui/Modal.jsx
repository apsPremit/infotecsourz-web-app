'use client';

import { MouseEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { RxCross2 } from 'react-icons/rx';

const Modal = ({ className, children, isOpen, setOpen }) => {
  if (!isOpen) return null;

  const onClose = () => {
    setOpen(false);
  };

  const handleOutsideClose = (e) => {
    if (e.target instanceof HTMLElement && e.target.id === 'modalWrapper') {
      onClose();
    }
  };

  return (
    <div
      id='modalWrapper'
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      onClick={handleOutsideClose}
    >
      <div className={twMerge(`bg-white w-[600px] rounded`, className)}>
        <div className='flex justify-end cursor-pointer'>
          <RxCross2 size={24} className='text-slate-500' onClick={onClose} />
        </div>
        <div className='p-5'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
