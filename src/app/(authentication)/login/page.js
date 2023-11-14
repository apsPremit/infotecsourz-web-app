
import LoginForm from '@/components/authentication/LoginForm/LoginForm';
import logo from '@/assets/images/logo.png';
import loginLogo from '../../../../public/images/others/cake logo.png'
import logoWhite from '../../../../public/images/others/logoWhite.png'
import React from 'react';
import styles from '@/app/styles.module.css'
import Image from 'next/image';

export const metadata = {
    title: "Login | Infotecsourz",
    description: "$20 Free Credit Photo Retouching App"
}
const Login = () => {
    return (
        <div>
            <div className='lg:grid grid-cols-2 min-h-screen  mx-auto '>
                <div className={`hidden lg:flex justify-center items-center ${styles.bg_image}`}>
                    <div className=' fill rounded-2xl bg-opacity-80  p-20 mx-20 relative'>

                        <Image
                            src={logoWhite}
                            height={600}
                            width={600}
                            fil="true"
                            alt="brand logo"
                            style={{ maxWidth: '140%', marginLeft: '-70px' }}
                            className=''

                        />
                        <p className=' text-xl text-white mt-5 text-center '>Best photo retouching solution for business.</p>
                    </div>
                </div>

                {/* right side  */}
                <LoginForm />
            </div>

        </div>
    );
};

export default Login;