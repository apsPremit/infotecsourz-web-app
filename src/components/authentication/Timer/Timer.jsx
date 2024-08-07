'use client';
import { downTime } from '@/redux/features/timeSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Timer = () => {
  const time = useSelector((state) => state.timer.time);
  const dispatch = useDispatch();
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    if (time > 0) {
      const countdown = setInterval(() => {
        dispatch(downTime());
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [time]);
  return (
    <div>
      <p>Resend OTP in {formatTime(time)}</p>
    </div>
  );
};

export default Timer;
