
import ProfileEditForm from '@/components/dashboard/profile/profileEditForm/ProfileEditForm';
import profileImage from '../../../../../../public/images/others/profile.png'
export const metadata = {
    title: "Edit Profile | Infotecsourz",
    description: "Photo Retouching App"
}
const page = () => {

    return (
        <div className=' lg:px-10 mx-auto'>

            <ProfileEditForm />

        </div>
    );
};

export default page;