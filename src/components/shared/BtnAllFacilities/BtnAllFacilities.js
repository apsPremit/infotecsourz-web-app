'use client';
import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const BtnAllFacilities = ({ facilities }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <div>
        <div className='flex  flex-col'>
          <div className='flex justify-start'>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className='text-blue-500 underline'
            >
              More Features
            </button>
          </div>
          <div className={`${showDetails ? '' : 'hidden'}`}>
            <ul className='list-inside list-disc '>
              {facilities?.map((item, i) => (
                <p
                  key={i}
                  className='my-2 flex items-center gap-x-2 text-center'
                >
                  <span className='text-sm'>
                    {' '}
                    <IoMdCheckmark color={'green'} />
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtnAllFacilities;
