'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import dashboardLogo from '@/assets/images/DashboardLogo.png';
import { StateContext } from '@/context/StateProvider';
import { RxCross1 } from 'react-icons/rx';
import { RiTranslate } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSupport } from 'react-icons/bi';
import { IoPowerOutline } from 'react-icons/io5';
import { CiCreditCard1 } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { IoMdPaperPlane } from 'react-icons/io';
import { FaQuestion } from 'react-icons/fa6';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
  const currentRoute = usePathname();
  const handleLogOut = async () => {
    signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };
  const { isSidebarOpen, setSidebarOpen } = useContext(StateContext);

  const session = useSession();

  return (
    <div
      className={` fixed  z-[999] h-screen  pt-8 duration-300 lg:w-52 lg:p-5 ${
        isSidebarOpen ? 'w-3/4  ' : 'lg w-0'
      }`}
      style={{
        background: 'linear-gradient(175deg, #0E1A45 0.02%, #4A01A9 100.02%)',
      }}
    >
      <div
        className={`relative flex items-center px-5 lg:block lg:px-0 ${
          isSidebarOpen ? 'translate-x-0 ' : '-translate-x-52 lg:translate-x-0'
        }`}
      >
        <Link href='/dashboard'>
          <Image
            src={dashboardLogo}
            alt='logo'
            width={300}
            height={50}
            className='max-w-[120%]'
          />
        </Link>

        <button
          className='absolute right-4 top-4'
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <RxCross1 className='cursor-pointer text-white duration-300 lg:hidden' />
        </button>
      </div>

      <div
        className={`flex h-full  flex-col px-5 text-white duration-300 lg:px-0 ${
          isSidebarOpen ? 'translate-x-0 ' : '-translate-x-52 lg:translate-x-0'
        }`}
      >
        <ul className='pt-6 text-white lg:flex-1'>
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard' ? 'bg-main' : ''
              }`}
            >
              <span className='text-2xl'>
                <AiOutlineHome />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/new_order'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/new_order' ? 'bg-main' : ''
              }`}
            >
              <span className='text-2xl'>
                <BsCartPlus />
              </span>
              <span>Create Order</span>
            </Link>
          </li>
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/profile'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/profile' ? 'bg-main' : ''
              }`}
            >
              <span className='text-2xl'>
                <BiUserCircle />
              </span>
              <span>Profile</span>
            </Link>
          </li>
          {/* pricing  */}
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/pricing'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/pricing' ? 'bg-main' : ''
              }`}
            >
              <span className='text-2xl'>
                <IoMdPaperPlane />
              </span>
              <span>Pricing</span>
            </Link>
          </li>
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/my-billing'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/my-billing' ? 'bg-main' : ''
              }`}
            >
              <span className='text-2xl'>
                <CiCreditCard1 />
              </span>
              <span className='whitespace-nowrap'>My Billing</span>
            </Link>
          </li>
          {/* faq  */}
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/faq'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/faq' ? 'bg-main' : ''
              }`}
            >
              <span className='text-xl'>
                <FaQuestion />
              </span>
              <span>FAQ</span>
            </Link>
          </li>
          {/* support  */}
          <li onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Link
              href='/dashboard/support'
              className={`my-3 flex cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main ${
                currentRoute === '/dashboard/support' ? 'bg-main' : ''
              }`}
            >
              <span className='text-xl'>
                <BiSupport />
              </span>
              <span>Support</span>
            </Link>
          </li>
        </ul>

        {session?.data?.user?.email && (
          <ul className='mb-10 text-white'>
            <li>
              <button
                onClick={handleLogOut}
                className='flex w-full  cursor-pointer items-center gap-x-3 rounded-lg p-2 hover:bg-main'
              >
                <span className='text-white'>
                  <IoPowerOutline size={24} />
                </span>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
