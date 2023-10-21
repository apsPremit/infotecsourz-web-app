"use client"
import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';
import { IoMdCheckmark } from "react-icons/io";
import PackageCheckbox from './PackageCheckbox/PackageCheckbox';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const SinglePackage = ({ plan }) => {
    const { setSelectedPackage, selectedPackage } = useContext(StateContext)

    const pathName = usePathname()


    const { id, package_name, price, photos, spec, facilities } = plan || {}
    return (
        <div className={`border-shadow rounded   p-5 shadow relative ${pathName === '/dashboard/package' && selectedPackage?.package_name === package_name ? 'bg-blue-500 text-white' : 'bg-white'}`}>
            <label className='cursor-pointer ' htmlFor={package_name}>
                <div className='min-h-[52px]'>
                    <h1 className='font-bold text-2xl capitalize'>{package_name}</h1>
                    {price && <h3 className='font-bold'> ${price}</h3>}
                </div>


                <hr className='my-3' />

                <div className='min-h-[520px]'>
                    <ul className='mb-5'>
                        {
                            spec?.map((sp, index) => <li className='list-inside list-disc' key={index}>{sp}</li>)
                        }
                    </ul>



                    {
                        photos && <p className='gap-x-2 flex items-center my-2'>
                            <span className='text-sm'> <IoMdCheckmark color={pathName === '/dashboard/package' && selectedPackage?.package_name === package_name ? "white" : "green"} /></span>
                            <span>{photos} Photos </span>
                        </p>
                    }


                    {
                        facilities && facilities.map((facility, index) =>
                            <p key={index} className='gap-x-2 flex items-center my-2'>
                                <span className='text-sm'> <IoMdCheckmark color={pathName === '/dashboard/package' && selectedPackage?.package_name === package_name ? "white" : "green"} /></span>
                                <span>{facility}</span>
                            </p>
                        )
                    }
                </div>
                <div className=''>
                    {
                        pathName === '/dashboard/pricing' &&
                            package_name == 'free trial' || package_name == 'pay as go' ?
                            <Link href='/dashboard/new_order'>
                                <button onClick={() => setSelectedPackage(plan)} className='py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full  '>Get Started</button>
                            </Link>
                            :
                            package_name === 'enterprise' ?
                                <Link href='/dashboard/support'>
                                    <button className='py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full  '>Contact Us</button>
                                </Link>
                                :
                                <Link href={`/dashboard/pricing/billing_info?package=${package_name}`}>
                                    <button onClick={() => setSelectedPackage(plan)} className='py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full  '>Buy Now</button>
                                </Link>
                    }
                </div>

                {
                    pathName === '/dashboard/package' && <PackageCheckbox isChecked={package_name === selectedPackage?.package_name} plan={plan} />
                }

            </label >
        </div >
    );
};

export default SinglePackage;