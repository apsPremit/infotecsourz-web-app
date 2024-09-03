'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import defaultProfileImage from '../../../../../public/images/others/profile.png';
import { StateContext } from '@/context/StateProvider';
import { signOut, useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthProvider';
import { useSelector } from 'react-redux';
import Modal from '@/components/ui/Modal';
import { useDeleteUserMutation } from '@/redux/services/userApi';
import toast, { Toaster } from 'react-hot-toast';
import UncancelModal from '@/components/ui/UncancelModal';
import { ImSpinner3 } from 'react-icons/im';

const ProfilePage = () => {
  const { userData } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [openUncancel, setOpenUncancel] = useState(false);
  const [deleteAccount] = useDeleteUserMutation();
  const session = useSession();
  const user = session?.data?.user;
  const img = useSelector((state) => state.profileImage?.img);
  const { name, email, phone, country, company } = userData || {};
  const imgSrc = img
    ? `${img}?t=${new Date().getTime()}`
    : userData?.photo || defaultProfileImage;

  const handleAccountDelete = async () => {
    try {
      await deleteAccount(user?.userId).unwrap();
      setOpen(false);
      setOpenUncancel(true);
      setTimeout(() => {
        setOpenUncancel(false);
        signOut();
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message || 'something went wrong');
    }
  };

  return (
    <div className='lg:px-10 '>
      <div className='mb-5 space-x-5 rounded bg-white p-5 md:flex '>
        <Image
          src={imgSrc}
          height={150}
          width={150}
          alt='profile photo'
          className='mb-3 h-[250px] w-full   rounded  border md:w-auto lg:h-[150px]'
          style={{ maxWidth: '150px', objectFit: 'fill' }}
        />
        <div className=''>
          <h3 className='mb-1 text-3xl'>{name}</h3>
          <p className='mb-1 ml-1 font-bold text-main'>{email}</p>
          {country && (
            <div className='mb-3 flex items-center'>
              <span className='mr-2 font-bold text-main'>
                <IoLocationOutline size={20} />
              </span>
              <p>{country}</p>
            </div>
          )}

          <div>
            <Link href='/dashboard/profile/edit'>
              <button className='rounded border border-shadow px-3 py-1.5'>
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* basic informatin  */}
      <div className='mb-5 rounded bg-white p-5'>
        <h3 className='mb-5  text-xl'>Contact Information</h3>

        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Name</p>
          <p>{name}</p>
        </div>
        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Email Address</p>
          <p>{email}</p>
        </div>

        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Country</p>
          <p>{country}</p>
        </div>
        <div className='mb-2 justify-between md:flex'>
          <p className='text-main'>Phone</p>
          <p>{phone}</p>
        </div>
      </div>
      {/* basic informatin  */}
      <div className='mb-5 rounded bg-white p-5 border-red-500 border shadow'>
        <h3 className='mb-3  text-xl font-bold'>Delete Account</h3>
        <p>
          You are about to permanently delete your account from the Infotecsourz
          app. This action is irreversible, order and photos will be lost.
          Please proceed with caution.
        </p>
        <div className='flex justify-end mt-5'>
          <button
            onClick={() => setOpen(true)}
            className='px-3 py-1.5 rounded text-white bg-red-500 hover:bg-red-700'
          >
            Delete Account
          </button>
        </div>
        <Modal isOpen={isOpen} setOpen={setOpen} className='w-[450px]'>
          <div>
            <h3 className='text-xl font-semibold '>Confirm Account Deletion</h3>
            <div className='my-3'>
              <p>
                Please confirm that you want to proceed with this action. If you
                have any concerns, do not hesitate to contact our support team.
              </p>

              <div className='flex justify-end'>
                <button
                  onClick={handleAccountDelete}
                  className='mt-3 px-3 py-1.5 rounded text-white bg-red-500 hover:bg-red-700'
                  variant='primary'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <UncancelModal
          isOpen={openUncancel}
          setOpen={setOpenUncancel}
          className='w-[200px]'
        >
          <div className='flex flex-col justify-center items-center space-y-3'>
            <h3 className='text-xl font-semibold text-center'>Sign Out</h3>
            <ImSpinner3 className='text-main animate-spin' size={25} />
          </div>
        </UncancelModal>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
