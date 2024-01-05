"use client";
import { UserAuth } from "@/context/AuthProvider";
import React from "react";

import moment from "moment";
import Link from "next/link";

const PlanBox = ({ subscriptions }) => {
  const { userData } = UserAuth();
  if (!subscriptions) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const currentSubscription = subscriptions[0];
  const {
    _id,
    orderId,
    OrderName,
    name,
    email,
    status,
    paymentStatus,
    invoiceStatus,
    package: pack,
    subtotal,
    taxRate,
    taxTotal,
    grandTotal,
    createdAt,
    paymentMethod,
    expiration,
    validity,
    credit,
    price,
    photos,
  } = currentSubscription || {};

  return (
    <div>
      <h1 className=" text-2xl mb-3 ml-3 text-gray-700 medium  whitespace-nowrap">
        My Plan
      </h1>
      <div className="bg-white p-10 rounded border">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-xl text-gray-800 capitalize">
              {pack}
              <span className="bg-blue-500 text-white text-xs ml-5 font-normal p-1.5 rounded-xl">
                Active
              </span>
            </h3>
            <p className="text-red-400 mt-3 text-sm">
              Your subscription will be expire on{" "}
              {moment(expiration).format("MMM D, YYYY")}
            </p>
          </div>
          <div>
            <h3 className="text-lg">
              <span className="text-main"> ${price || "0"}</span> For{" "}
              {credit || "0"} Credit
            </h3>
            <p className="text-sm">Validity {validity} Days</p>
            <p className="text-sm">
              Subscribed on {moment(createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>

        <div className="space-x-3 mt-5">
          <Link href="/dashboard/pricing">
            <button className="bg-main text-white px-2.5 py-1.5 rounded hover:bg-mainHover">
              Upgrade Plan
            </button>
          </Link>
          {/* <button className="bg-slate-200 text-black px-2.5 py-1.5 rounded hover:bg-slate-300">
            Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PlanBox;
