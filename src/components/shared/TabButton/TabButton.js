import React from 'react';

const TabButton = ({
  title,
  id,
  isActive,
  padding_x,
  padding_y,
  text_size,
  event,
}) => {
  return (
    <button
      onClick={event}
      className={`px-${padding_x || '3'} py-${
        padding_y || '2'
      } me-2 flex cursor-grab flex-nowrap  items-center gap-x-2 rounded-lg border-2 lg:me-0 lg:cursor-context-menu  ${
        isActive ? 'border-main' : 'border-shadow'
      }`}
    >
      <span
        className={`text-${text_size || 'xs'} font-bold  px-${
          padding_x || '2'
        } rounded py-1 ${isActive ? 'bg-main text-white' : 'bg-shadow'}`}
      >
        {id}
      </span>
      <span className='text-xs'>{title}</span>
    </button>
  );
};

export default TabButton;
