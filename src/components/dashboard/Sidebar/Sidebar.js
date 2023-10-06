"use client"
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import dashboardLogo from '@/assets/images/DashboardLogo.png'
import Dashboard from '@/assets/images/Dashboard.png'
import faq from '@/assets/images/faq.png'
import invoice from '@/assets/images/invoice.png'
import order from '@/assets/images/order.png'
import profile from '@/assets/images/user.png'
import control from '@/assets/images/control.png'
import logo from '@/assets/images/logo.png'
import pricing from '@/assets/images/pricing.png'
import { StateContext } from '@/context/StateProvider';
import { RxCross1 } from "react-icons/rx";
import { RiTranslate } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSupport } from "react-icons/bi";
import { IoPowerOutline } from "react-icons/io5";
import { UserAuth } from '@/context/AuthProvider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



const Sidebar = () => {
    const currentRoute = usePathname()
    const router = useRouter()
    const { logOut, user, setUserData } = UserAuth()

    const handleLogOut = async () => {
        await logOut()
        Cookies.remove('access-token')
        router.push('/login')
        setUserData({})
    }

    const Menus = [
        { title: "Dashboard", src: Dashboard, href: '/dashboard' },
        { title: "New order", src: order, href: '/dashboard/new_order' },
        // { title: "Invoice", src: invoice, href: '/dashboard/invoice' },
        { title: "Profile ", src: profile, href: '/dashboard/profile' },
        { title: "Pricing", src: pricing, href: '/dashboard/pricing' },
        { title: "FAQ", src: faq, href: '/dashboard/faq' },
        { title: "Support", src: <BiSupport size={20} />, href: '/dashboard/support', type: 'comIcon' },


    ];

    const { isSidebarOpen, setSidebarOpen } = useContext(StateContext)

    return (
        <div className={` h-screen  z-20 lg:p-5  pt-8 fixed duration-300 lg:w-52 ${isSidebarOpen ? 'w-full  ' : 'w-0 lg'}`} style={{
            background: 'linear-gradient(175deg, #0E1A45 0.02%, #4A01A9 100.02%)'
        }}>


            <div className={`flex px-5 lg:px-0 relative lg:block items-center ${isSidebarOpen ? 'translate-x-0 ' : '-translate-x-52 lg:translate-x-0'}`}>
                <Image
                    src={dashboardLogo}
                    alt='logo'
                    width={250}
                    height={40}

                />

                <button className='absolute top-2 right-4' onClick={() => setSidebarOpen(!isSidebarOpen)}> <RxCross1 className='lg:hidden duration-300 cursor-pointer text-white' /></button>
            </div>


            <div className={`flex px-5  h-full text-white lg:px-0 flex-col duration-300 ${isSidebarOpen ? 'translate-x-0 ' : '-translate-x-52 lg:translate-x-0'}`}>
                <ul className='pt-6 text-white flex-1'>
                    {
                        Menus.map((item, index) => <Link
                            key={index}
                            href={item?.href}
                        >
                            <li
                                onClick={() => setSidebarOpen(!isSidebarOpen)}

                                className={`flex gap-x-3 my-2 items-center p-2 cursor-pointer hover:bg-main rounded-lg ${currentRoute === item?.href ? 'bg-main' : ''}`}
                            >
                                {
                                    item?.type === 'comIcon' ?
                                        <span > {item?.src}</span>
                                        : <Image
                                            src={item.src}
                                            alt={item.title}
                                            width={20}
                                            height={20}
                                        />
                                }
                                {item.title}
                            </li>
                        </Link>)
                    }
                </ul>

                {
                    user?.email && <ul className='text-white mb-10'>
                        <li


                        >
                            <button onClick={handleLogOut} className='flex w-full  gap-x-3 items-center p-2 cursor-pointer hover:bg-main rounded-lg'>
                                <span className='text-white'><IoPowerOutline size={24} /></span>
                                Logout
                            </button>
                        </li>
                    </ul>
                }
            </div>


        </div >
    );
};

export default Sidebar;