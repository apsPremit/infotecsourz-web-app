import ResetForm from "@/components/authentication/ResetForm/ResetForm";
import styles from '@/app/styles.module.css'


const PasswordReset = () => {
    return (
        <div className={`w-screen h-screen flex justify-center items-center ${styles.bg_image}`}>

            <ResetForm />
        </div>
    );
};

export default PasswordReset;