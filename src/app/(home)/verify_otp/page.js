import OtpVerifyForm from '@/components/authentication/OtpVerifyForm/OtpVerifyForm';
import React from 'react';
import styles from '@/app/styles.module.css';

const VerifyOtp = () => {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${styles.bg_image}`}
    >
      <OtpVerifyForm />
    </div>
  );
};

export default VerifyOtp;
