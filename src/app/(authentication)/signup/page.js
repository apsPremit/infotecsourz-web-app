import SignUpForm from '@/components/authentication/SignUpForm/SignupForm';
import styles from '@/app/styles.module.css'

const SignUp = () => {
    return (

        <div className='lg:grid grid-cols-2 min-h-screen  mx-auto '>
            <div className={`hidden lg:flex justify-center items-center ${styles.bg_image}`}>
                <div className='  text-white bg-[#FFFFFF26] backdrop-blur-lg p-20 text-5xl mx-20 relative'>



                    <h1 className=' text-white font-bold leading-snug'>Start for free today and get <strong className='text-black'>attractive</strong> offers.</h1>
                    <p className='text-white text-sm leading-6'>Streamline operations with real-time metrics and user management.</p>
                </div>
            </div>

            {/* **************right side ************ */}

            <SignUpForm />
        </div>
    );
};

export default SignUp;