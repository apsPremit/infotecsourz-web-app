import SuccessButton from "@/components/dashboard/revision/RevisionSubmitForm/SuccessButton/SuccessButton";
import Link from "next/link";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const RevisionSuccess = ({ searchParams }) => {
  const { orderId } = searchParams;

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="border border-shadow  shadow-lg  rounded lg:w-2/5 ">
        <div className="  bg-white p-10 rounded">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl text-green-500 text-center mx-auto mb-5">
              {<IoIosCheckmarkCircleOutline className="text-center" />}
            </h1>
            {/* <h1 className="text-lg"> #{orderId} </h1> */}
            <h1 className="text-lg text-center font-semibold">
              Revision request has been successfully sent for Order ID:{" "}
              {orderId}
            </h1>
            {/* <h1 className="text-xl lg:text-2xl font-bold mb-5">
              {message ? message : " Order Placed successful!"}
            </h1> */}
            <p className="text-sm mt-5">
              Once the revision is done, we&apos;ll send you an email and update
              your order status on the dashboard.
            </p>

            <p className="text-sm mt-5">Thank you</p>
            <SuccessButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionSuccess;
