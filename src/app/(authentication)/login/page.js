
import LoginForm from '@/components/authentication/LoginForm/LoginForm';
import logo from '@/assets/images/logo.png';
import React from 'react';
import styles from '@/app/styles.module.css'

const Login = () => {
    return (
        <div>
            <div className='lg:grid grid-cols-2 min-h-screen  mx-auto '>
                <div className={`hidden lg:flex justify-center items-center ${styles.bg_image}`}>
                    <div className='  text-white bg-[#FFFFFF26] backdrop-blur-lg p-20 text-5xl mx-20 relative'>


                        <h1 className=' text-white font-bold leading-snug'>Transform your business with digital <strong className='text-black'>branding.</strong></h1>
                        <p className='text-white text-sm leading-6'>Enhance operational efficiency with real-time metrics and streamlined user management.</p>
                    </div>
                </div>

                {/* right side  */}
                <LoginForm />
            </div>

        </div>
    );
};

export default Login;