"use client";
import React, { useContext, useState } from "react";
import { StateContext } from "@/context/StateProvider";
import { UserAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/functions/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Swal from "sweetalert2";

const PricingBilling = ({ pack }) => {
  const { taxRate, setOrderDetails } = useContext(StateContext);
  const [isAgree, setAgree] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const { userData } = UserAuth();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const router = useRouter();
  const { package_name, price, photos } = pack || {};

  let subTotal = price;
  let taxTotal = (price / 100) * taxRate;
  let grandTotal = subTotal + taxTotal;

  let billProperties = [
    { title: "Package Name", value: package_name },
    { title: "Package Credit", value: photos },
    { title: "Package Price", value: "$" + price },
    { title: "Subtotal", value: "$" + subTotal },
    { title: "Tax", value: "$" + taxTotal },
    { title: "GrandTotal", value: "$" + grandTotal },
  ];

  const randomNum = Math.floor(Math.random() * 100000000);
  const randomString = String(randomNum).padStart(8, "0");

  const orderDetails = {
    orderId: randomString,
    orderName: `subscription for ${package_name} package`,
    name: userData?.name,
    email: userData?.email,
    package: package_name,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    credit: photos,
    country: userData?.country || "",
    paymentMethod,
  };

  const confirmOrder = async () => {
    setOrderDetails(orderDetails);
  };

  return (
    <div className=" rounded p-5 lg:p-10  mt-10 w-full  md:w-3/4 lg:w-1/2 mx-auto">
      {/* right side  */}
      <div className="bg-white p-10">
        <h3 className="font-bold text-xl mb-5">Summary</h3>

        {/* properties  */}
        <div className="my-5 ">
          {billProperties.map((property, index) => (
            <div className="my-3 " key={index}>
              <div className="flex justify-between items-center ">
                <h3 className="text-[#ADACB0]">{property?.title}</h3>
                <h3>{property?.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <hr />

        <div className="flex items-center space-x-3 my-7">
          <div>
            <p className="px-5 py-2.5 border rounded text-2xl ">$</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <span className="mr-1">$</span> {grandTotal?.toFixed(2)}{" "}
              <span>USD</span>
            </h3>
            <p className="text-neutral">Cost</p>
          </div>
        </div>

        {/* billing btn and process  */}
        <div>
          <Link href="/dashboard/pricing/billing/payment">
            <button
              disabled={!isAgree || isProcessing}
              onClick={confirmOrder}
              className="w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer"
            >
              {isProcessing ? "Processing..." : "Confirm Order"}
            </button>
          </Link>
          <label
            htmlFor="agree_terms"
            className="flex items-start gap-x-4 px-2 mt-3 cursor-pointer"
          >
            <input
              onChange={() => setAgree(!isAgree)}
              id="agree_terms"
              checked={isAgree}
              type="checkbox"
              className="scale-125 mt-1"
            />
            <p className="text-sm">
              I accept{" "}
              <Link
                target="_blank"
                href="https://www.infotecsourz.com/terms-and-conditions/"
                className="text-main hover:underline"
              >
                Terms & Conditions
              </Link>
            </p>
          </label>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default PricingBilling;
