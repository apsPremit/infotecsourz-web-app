'use client';
import TabButton from '@/components/shared/TabButton/TabButton';
import { StateContext } from '@/context/StateProvider';
import React, { useCallback, useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const NewOrderTab = () => {
  const { currentSlide } = useContext(StateContext);

  let activeTabs = [];

  const tabData = [
    { id: 1, title: 'Photo Type' },
    { id: 2, title: 'Name' },
    { id: 3, title: 'Formats' },
    { id: 4, title: 'Background' },
    { id: 5, title: 'Cropping & Alignment' },
    { id: 6, title: 'Final Touch' },
  ];
  for (let i = 1; i <= currentSlide; i++) {
    if (!activeTabs.includes(i)) {
      activeTabs.push(i);
    }
  }

  return (
    <div>
      <div className='relative hidden flex-wrap items-center  gap-x-2 lg:flex'>
        {tabData.map((item, index) => (
          <TabButton
            key={index}
            id={item?.id}
            title={item?.title}
            isActive={activeTabs.includes(item?.id)}
          />
        ))}
      </div>
      <div className='lg:hidden'>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 3,
            },
            550: {
              slidesPerView: 3,
            },
            650: {
              slidesPerView: 4,
            },
            780: {
              slidesPerView: 5,
            },
            950: {
              slidesPerView: 6,
            },
          }}
          className=''
        >
          {tabData.map((item, index) => (
            <SwiperSlide key={index}>
              <TabButton
                id={item?.id}
                title={item?.title}
                isActive={activeTabs.includes(item?.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewOrderTab;
