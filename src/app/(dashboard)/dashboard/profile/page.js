import React from 'react';
import profileImage from '../../../../../public/images/others/profile.png';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import ProfilePage from '@/components/dashboard/profile/ProfilePage/ProfilePage';
export const metadata = {
  title: 'Profile | Infotecsourz',
  description: 'Photo Retouching App',
};
const Profile = () => {
  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Profile;
