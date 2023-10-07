import SignUpForm from '@/components/authentication/SignUpForm/SignupForm';
import styles from '@/app/styles.module.css'
import Image from 'next/image';
import loginLogo from '../../../../public/images/others/cake logo.png'
const SignUp = () => {
    return (

        <div className='lg:grid grid-cols-2 min-h-screen  mx-auto '>
            <div className={`hidden lg:flex justify-center items-center ${styles.bg_image}`}>
                <div className=' fill rounded bg-opacity-80 bg-white backdrop-blur-lg p-20 mx-20 relative'>


                    <Image
                        src={loginLogo}
                        fil="true"
                        alt="brand logo"
                    />
                    <p className=' text-md text-center '>Best photo retouching service provider</p>
                </div>
            </div>

            {/* **************right side ************ */}

            <SignUpForm />
        </div>
    );
};

export default SignUp;