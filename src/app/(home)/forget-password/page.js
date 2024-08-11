import ResetForm from '@/components/authentication/ResetForm/ResetForm';
import styles from '@/app/styles.module.css';

const PasswordReset = () => {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${styles.bg_image}`}
    >
      <ResetForm />
    </div>
  );
};

export default PasswordReset;
