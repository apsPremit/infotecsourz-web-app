import React from 'react';

const TabButton = ({ title, id, isActive, padding_x, padding_y, text_size, event }) => {

    return (
        <button onClick={event} className={`px-${padding_x || '3'} py-${padding_y || '2'} border-2 me-2 lg:me-0 cursor-grab  lg:cursor-context-menu rounded-lg flex items-center gap-x-2 flex-nowrap  ${isActive ? 'border-main' : 'border-shadow'}`}>
            <span className={`text-${text_size || 'sm'} font-bold  px-${padding_x || '2'} py-1 rounded ${isActive ? 'bg-main text-white' : 'bg-shadow'}`}>{id}</span>
            <span className='text-sm'>{title}</span>
        </button>
    );
};

export default TabButton;