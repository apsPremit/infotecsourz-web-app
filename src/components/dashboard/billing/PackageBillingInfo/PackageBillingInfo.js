"use client"
import { UserAuth } from '@/context/AuthProvider';
import { StateContext } from '@/context/StateProvider';
import moment from 'moment/moment';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useContext } from 'react';
import { packages } from '@/utils/json/packagePlan'

const PackageBillingInfo = () => {
    const params = useSearchParams();
    const searchPackage = params.get('package')
    const { user } = UserAuth()
    const packageInfo = packages.find(pk => pk.package_name === searchPackage)
    const { package_name, price, photos } = packageInfo || {}

    const fields = [
        { label: 'Name', value: user?.displayName, type: 'text' },
        { label: 'Email', value: user?.email, type: 'text' },
        { label: 'Package name', value: package_name, type: 'text' },
        { label: 'Price', value: price, type: 'number' },
        { label: 'Credit', value: photos, type: 'number' },
    ]


    return (
        <div className='lg:w-1/2 mx-auto bg-white p-10 rounded mt-10'>
            <div className=' gap-5 space-y-4'>
                {
                    fields.map((field, index) => <div className=''
                        key={index}
                    >
                        <label>
                            <span className='text-[#9d9c9c] text-sm mb-4 ml-1'>{field?.label}</span>
                            <input
                                type={field?.type}
                                value={field?.value}
                                className='border border-shadow w-full px-3 py-1.5 rounded outline-0 focus:rounded focus:border-main cursor-not-allowed'
                                disabled
                            />
                        </label>
                    </div>)
                }

            </div>



            {/* btn proceed  */}
            <div className='flex justify-center mt-5'>

                <Link href={`/dashboard/pricing/billing?package=${searchPackage}`}>
                    <button className='text-white px-3.5 py-2 bg-main hover:bg-mainHover rounded flex disabled:cursor-not-allowed disabled:bg-mainHover'>Proceed
                    </button>
                </Link>

            </div>
        </div >
    );
};

export default PackageBillingInfo;