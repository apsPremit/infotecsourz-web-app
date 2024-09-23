import LoginForm from '@/components/authentication/LoginForm/LoginForm';
import infotecsourzLogo from '../../../../public/images/others/infotecsorzLogo.png';
import React from 'react';
import styles from '@/app/styles.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'Login | Infotecsourz',
  description: '$20 Free Credit Photo Retouching App',
};
const Login = () => {
  return (
    <div>
      <div className='mx-auto min-h-screen flex justify-between '>
        <div
          className={`hidden items-center justify-center lg:flex flex-1 ${styles.bg_image} w-1/2`}
        >
          <div className=' fill relative mx-20  rounded-2xl bg-opacity-80 p-20'>
            <Image
              src={infotecsourzLogo}
              height={600}
              width={600}
              fil='true'
              alt='brand logo'
              style={{ maxWidth: '140%', marginLeft: '-70px' }}
              className=''
            />
            <p className=' mt-5 text-center text-xl text-white '>
              Virtual Photo Retouching Studio.
            </p>
          </div>
        </div>

        {/* right side  */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
