"use client";
import React, { useEffect, useState } from "react";
import OrderRow from "../OrderRow/OrderRow";
import { ImSpinner2 } from "react-icons/im";
import { baseUrl } from "@/utils/functions/baseUrl";
import { UserAuth } from "@/context/AuthProvider";

const OrderTable = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { userData } = UserAuth();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRes = await fetch(`${baseUrl}/order/${userData?.email}`);
        if (!orderRes.ok) {
          throw new Error(error?.message || "something went wrong");
        }
        const orderData = await orderRes.json();
        setOrders(orderData?.data);
      } catch (error) {
        throw new Error(error?.message || "something went wrong");
      }
    };
    fetchOrder();
  }, [userData]);
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center text-xl text-main">
          <ImSpinner2 className="animate-spin" />
        </div>
      ) : (
        orders.length >= 1 && (
          <div className="flex flex-col bg-white">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                        >
                          Order
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                        >
                          Order Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                        >
                          Ready File
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                        >
                          Created Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                        >
                          Return Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                        >
                          Payment Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                        >
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map((order) => (
                        <OrderRow key={order?._id} order={order} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrderTable;
