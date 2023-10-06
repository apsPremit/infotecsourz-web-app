
import ProfileEditForm from '@/components/dashboard/profile/profileEditForm/ProfileEditForm';
import profileImage from '../../../../../../public/images/others/profile.png'

const page = () => {

    const details = {
        name: 'Unknown',
        email: 'user@gmail.com',
        imageUrl: profileImage,
        location: 'Dhaka, Bangladesh',
        phone: '0195000000',
        nid: '123456789',
        vatId: '123456789',
        companyName: 'infotecsourz',
        companyWebsite: 'www.infotecsourz.com',
        zipCode: '123456',
        country: 'Bangladesh',
        Gender: 'Male',
        dataOfBirth: '01/01/2000',
        gender: 'male'



    }




    return (
        <div className=' lg:px-10 mx-auto'>

            <ProfileEditForm details={details} />

        </div>
    );
};

export default page;