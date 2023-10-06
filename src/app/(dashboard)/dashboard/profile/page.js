import React from 'react';
import profileImage from '../../../../../public/images/others/profile.png'
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";
import Link from 'next/link';
import LogOutBtn from '@/components/shared/LogOutBtn/LogOutBtn';
import ProfilePage from '@/components/dashboard/profile/ProfilePage/ProfilePage';

const Profile = () => {



    return (
        <>
            <ProfilePage />
        </>
    );
};

export default Profile;