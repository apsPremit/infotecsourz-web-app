"use client";
import { StateContext } from "@/context/StateProvider";
import React, { useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserAuth } from "@/context/AuthProvider";

const SinglePackage = ({ plan }) => {
  const { setSelectedPackage, selectedPackage } = useContext(StateContext);
  const { userData } = UserAuth();

  const pathName = usePathname();

  const handlePackageSelect = (plan) => {
    if (plan?.package_name === "pay as go") {
      setSelectedPackage(plan);
    }
  };

  const {
    packageId,
    package_name,
    price,
    photos,
    spec,
    facilities,
    highLight,
  } = plan || {};

  return (
    <div className="border-shadow rounded   p-5 shadow relative">
      <label className="cursor-pointer " htmlFor={package_name}>
        <div className="min-h-[52px]">
          <h1 className="font-bold text-2xl capitalize">{package_name}</h1>
          {highLight && (
            <h3 className="font-semibold mt-3 capitalize">{highLight}</h3>
          )}
          {package_name === "free trial" ||
            (price && <h3 className="font-bold mt-3 text-lg">${price}</h3>)}
        </div>

        <hr className="my-3" />

        <div className="min-h-[520px]">
          <ul className="mb-5">
            {spec?.map((sp, index) => (
              <li className="list-inside list-disc" key={index}>
                {sp}
              </li>
            ))}
          </ul>

          {photos && (
            <p className="gap-x-2 flex items-center my-2">
              <span className="text-sm">
                <IoMdCheckmark color={"green"} />
              </span>
              <span>{photos} Photos </span>
            </p>
          )}

          {facilities &&
            facilities.map((facility, index) => (
              <p key={index} className="gap-x-2 flex items-center my-2">
                <span className="text-sm">
                  <IoMdCheckmark color={"green"} />
                </span>
                <span>{facility}</span>
              </p>
            ))}
        </div>
        <div className="">
          {package_name == "free trial" || package_name == "pay as go" ? (
            <Link
              href="/dashboard/new_order"
              className={`${pathName === "/dashboard/package" && "hidden"}`}
            >
              <button
                onClick={() => handlePackageSelect(plan)}
                disabled={
                  package_name === "free trial" &&
                  userData?.subscribedPackage !== "free trial"
                }
                className="py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full disabled:bg-blue-200"
              >
                Get Started
              </button>
            </Link>
          ) : package_name === "enterprise" ? (
            <Link href="/dashboard/support">
              <button className="py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full  ">
                Contact Us
              </button>
            </Link>
          ) : (
            <Link href={`/dashboard/pricing/billing_info?package=${packageId}`}>
              <button className="py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full  ">
                Buy Now
              </button>
            </Link>
          )}
        </div>
      </label>
    </div>
  );
};

export default SinglePackage;
