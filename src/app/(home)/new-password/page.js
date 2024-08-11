import styles from '@/app/styles.module.css';
import NewPasswordForm from '@/components/authentication/NewPasswordForm/NewPasswordForm';

const NewPassword = () => {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${styles.bg_image}`}
    >
      <NewPasswordForm />
    </div>
  );
};

export default NewPassword;
