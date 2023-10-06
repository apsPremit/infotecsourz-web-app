
import styles from '@/app/styles.module.css'
import NewPasswordForm from '@/components/authentication/NewPasswordForm/NewPasswordForm';

const NewPassword = () => {
    return (
        <div className={`w-screen h-screen flex justify-center items-center ${styles.bg_image}`}>

            <NewPasswordForm />
        </div>
    );
};

export default NewPassword;