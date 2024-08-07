'use client';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import React, { useState } from 'react';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import {
  useForgetPasswordMutation,
  useVerifyOtpMutation,
} from '@/redux/services/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { setTime } from '@/redux/features/timeSlice';
import Spinner from '@/components/ui/Spinner';
import Timer from '../Timer/Timer';
const OtpVerifyForm = () => {
  const [otp, setOtp] = useState(null);
  const [verifyOtp, { isError, isSuccess, isLoading }] = useVerifyOtpMutation();
  const [forgetPassword, { isLoading: forgetLoading }] =
    useForgetPasswordMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const time = useSelector((state) => state.timer.time);
  const search = useSearchParams();
  const email = search.get('email');
  const handleOpt = async () => {
    const response = await verifyOtp({ otp });
    if (response.error) {
      toast.error(response?.error?.data?.message || 'something went wrong');
    }
    if (response.data) {
      const token = response?.data?.data?.token;
      router.push(`/new-password?t=${token}`);
    }
  };

  const handleResend = async (event) => {
    event.preventDefault();
    const response = await forgetPassword({ email });
    if (response?.error) {
      return toast.error(
        response?.error?.data?.message || 'something went wrong'
      );
    }
    if (response?.data) {
      dispatch(setTime(180));
      toast.success('otp resent');
    }
  };

  return (
    <div className='rounded-lg bg-white p-12 flex items-center flex-col'>
      <Image src={logo} alt='logo' width={56} height={50} />
      <h2 className='my-4 text-3xl'>Verify OTP</h2>
      <p className='mb-3 text-sm '>
        Enter the OTP we sent to your email address.
      </p>

      {/* ??????????????????Otp ****** */}
      <div className='mb-3'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: '35px',
            height: '35px',
            border: '2px solid #333',
            margin: '10px',
            borderRadius: '3px',
          }}
        />
      </div>

      {time > 0 ? (
        <Timer />
      ) : forgetLoading ? (
        <Spinner />
      ) : (
        <button onClick={handleResend} className='hover:underline'>
          Resend
        </button>
      )}
      <button
        onClick={handleOpt}
        className='bg-main my-5 w-full rounded-lg px-3 py-3 text-center font-bold text-white hover:bg-[#5736ce] disabled:bg-opacity-50'
        type='submit'
      >
        <span className='flex items-center justify-center gap-2'>
          Send Otp
          {isLoading && <Spinner />}
        </span>
      </button>
      <Toaster />
    </div>
  );
};

export default OtpVerifyForm;
