"use client"
import { UserAuth } from '@/context/AuthProvider'
import { baseUrl } from '@/utils/functions/baseUrl'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { RiNotification2Line } from 'react-icons/ri'




export default function Notification() {
    const { userData } = UserAuth()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/notification/premgaibandha@gmail.com`)
            .then(res => res.json())
            .then(result => setNotifications(result?.data))
            .catch(error => {
                console.log('notification', error.message)
            })
    }, [])


    return (
        <div className="">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="outline-0"
                        >
                            <label
                                type="button"
                                className="relative outline-none cursor-pointer"
                            >
                                <RiNotification2Line size={25} />
                                {
                                    notifications?.length > 0 && <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                        {notifications?.length}
                                    </div>
                                }
                            </label>

                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute mt-4 z-10 bg-white w-[350px]  md:w-[400px]  right-0 px-4 sm:px-0 ">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">

                                    <div className='p-4'>
                                        {
                                            notifications.length > 0 ?
                                                notifications?.map(not =>
                                                    <div key={not?._id} className=" p-2 rounded border-b">
                                                        <span className="block text-md font-bold text-gray-600">
                                                            Your order <span className='underline text-black'>#{not?.orderId}</span> is {not?.orderStatus}
                                                        </span>

                                                        <span className='text-xs mt-1 text-gray-500 flex items-center gap-x-1'>
                                                            <span><BiTime /></span>
                                                            {
                                                                moment(not?.createdAt).calendar()
                                                            }

                                                        </span>
                                                    </div>
                                                )

                                                :
                                                <span>You Have no Notification</span>

                                        }
                                    </div>

                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

function IconOne() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <path
                d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    )
}

function IconTwo() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <path
                d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    )
}

function IconThree() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
            <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
            <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
            <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
            <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
            <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
        </svg>
    )
}
