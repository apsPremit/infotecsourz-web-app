"use client"
import { UserAuth } from '@/context/AuthProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import getOrders from '@/utils/functions/getOrders';
import axios from 'axios';
// import getOrders from '@/utils/functions/getOrders';
import React, { useEffect, useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import OrderRow from '../OrderRow/OrderRow';
import { ImSpinner2 } from "react-icons/im";



const OrderTable = () => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])


    const { user, loading: userLoading, userData } = UserAuth()

    // useEffect(() => { window.location.reload() }, [])

    useEffect(() => {
        setLoading(false)
        axios.get(`${baseUrl}/order/${user?.email}`)
            .then(res => {

                setOrders(res.data)
                setLoading(false)
            })
            .catch(err => { setLoading(false) })

    }, [user, userData])




    return (
        <div>
            {
                loading ? <div className='flex items-center justify-center text-xl text-main'><ImSpinner2 className='animate-spin' /></div>
                    :
                    orders.length >= 1 &&
                    <div className="flex flex-col bg-white">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                                                >
                                                    Order
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                                                >
                                                    Order Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                                                >
                                                    Images
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                                                >
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                                                >
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                                                >
                                                    Created Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                                                >
                                                    Return Time
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                                                >
                                                    Payment Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                                                >
                                                    Invoice
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {
                                                orders.map(order => <OrderRow
                                                    key={order?._id}
                                                    order={order}
                                                />)
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default OrderTable;