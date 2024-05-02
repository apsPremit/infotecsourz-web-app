import SignUpForm from '@/components/authentication/SignUpForm/SignupForm';
import styles from '@/app/styles.module.css';
import Image from 'next/image';
import infotecsourzLogo from '../../../../public/images/others/infotecsorzLogo.png';

export const metadata = {
  title: 'Signup | Infotecsourz',
  description: '$20 Free Credit Photo Retouching App',
};

const SignUp = () => {
  return (
    <div className='mx-auto min-h-screen grid-cols-2  lg:grid '>
      <div
        className={`hidden items-center justify-center lg:flex ${styles.bg_image}`}
      >
        <div className=' fill fixed top-64  mx-20 rounded-2xl  bg-opacity-80 p-20'>
          <Image
            src={infotecsourzLogo}
            height={600}
            width={600}
            fil='true'
            alt='brand logo'
            style={{
              maxWidth: '140%',
              marginLeft: '-70px',
              marginTop: '-200px',
            }}
          />
          <p className=' mt-5 text-center text-xl text-white '>
            Virtual Photo Retouching Studio
          </p>
        </div>
      </div>

      {/* **************right side ************ */}

      <SignUpForm />
    </div>
  );
};

export default SignUp;
