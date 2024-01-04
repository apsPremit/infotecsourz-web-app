"use client";
import { StateContext } from "@/context/StateProvider";
import React, { useContext, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { UserAuth } from "@/context/AuthProvider";
import Swal from "sweetalert2";

const SinglePackage = ({ plan }) => {
  const { setSelectedPackage, selectedPackage, setShowPricingModal } =
    useContext(StateContext);
  const { userData } = UserAuth();
  const router = useRouter();
  const pathName = usePathname();
  const [showDetails, setShowDetails] = useState(false);
  const handleNavigation = (plan) => {
    if (plan?.package_name === "free trial") {
      return router.push(`/dashboard/pricing/billing?package=${plan?._id}`);
    }
    if (package_name === "pay as go") {
      setSelectedPackage(plan);
      return router.push("/dashboard/new_order");
    }
    Swal.fire({
      title: "Are you sure for subscribe this package?",
      text: `Your current pack will be upgraded and ${plan?.photos} credits will be added to your account. Your remain all credits from previous package will be added to your account automatically`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Subscribe",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/dashboard/pricing/billing?package=${plan?._id}`);
      }
    });
  };

  const getPerCost = (price, photos) => {
    const perPhotCost = price / photos;
    return perPhotCost.toFixed(2);
  };

  const {
    id,
    package_name,
    price,
    photos,
    spec,
    facilities,
    validity,
    type,
    title,
  } = plan || {};
  return (
    <>
      <div className={`border-shadow rounded   p-5 shadow relative bg-white`}>
        <label className="cursor-pointer " htmlFor={package_name}>
          <div className="min-h-[52px]">
            <h1 className="font-bold text-2xl capitalize">{package_name}</h1>
            {price > 0 && (
              <h3 className="font-bold">
                ${price}
                {type && <span className="">/{type}</span>}
              </h3>
            )}
            {title && <h3 className="font-bold">{title}</h3>}
          </div>

          <hr className="my-3" />

          <div className="min-h-[150px]">
            <ul className="mb-5">
              {photos > 0 && (
                <li className="list-inside list-disc">{photos} Photos</li>
              )}
              {photos > 0 && (
                <li className="list-inside list-disc">{photos} Credits</li>
              )}
              {validity > 0 && (
                <li className="list-inside list-disc">
                  {validity} Days Validity
                </li>
              )}
              {price > 0 && (
                <li className="list-inside list-disc">
                  ${getPerCost(price, photos)} price per photo
                </li>
              )}
              {spec?.map((sp, index) => (
                <li className="list-inside list-disc" key={index}>
                  {sp}
                </li>
              ))}
            </ul>

            {/* details  */}
            <div>
              <div className="flex b flex-col">
                <div className="flex justify-start">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-blue-500 underline"
                  >
                    More Features
                  </button>
                </div>
                <div className={`${showDetails ? "" : "hidden"}`}>
                  <ul className="list-inside list-disc">
                    {facilities?.map((item, i) => (
                      <p key={i} className="gap-x-2 flex items-center my-2">
                        <span className="text-sm">
                          {" "}
                          <IoMdCheckmark color={"green"} />
                        </span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {package_name === "pay as go" && (
              <button
                onClick={() => setShowPricingModal(true)}
                className="gap-x-2 flex items-center my-2 text-main  underline outline-0 border-0"
              >
                About Pricing
              </button>
            )}
          </div>

          <div>
            {package_name === userData?.subscribedPackage ? (
              <div className="group relative  flex justify-center">
                <button
                  disabled
                  className="py-2 my-5 px-3.5 text-white bg-mainHover rounded w-full  "
                >
                  Current Plan
                </button>
                <span className="absolute -top-10 scale-0 transition-all rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100">
                  You already have this plan. Choose another plan.
                </span>
              </div>
            ) : (
              <div className="group relative  flex justify-center">
                <button
                  disabled={
                    package_name === "free trial" &&
                    userData?.isAvailableFreeTrial === false
                  }
                  onClick={() => handleNavigation(plan)}
                  className="py-2 my-5 px-3.5 text-white bg-blue-500 hover:bg-blue-600 rounded w-full disabled:bg-blue-200 "
                >
                  {package_name == "free trial"
                    ? "Start Free Trial"
                    : "Subscribe"}
                </button>
                {package_name === "pay as go" && (
                  <span className="absolute -top-10 scale-0 transition-all rounded bg-slate-500 p-2 text-xs text-white group-hover:scale-100">
                    Charge depends on your retouching needs.
                  </span>
                )}
                {package_name === "free trial" &&
                  userData?.isAvailableFreeTrial == false && (
                    <span className="absolute -top-10 scale-0 transition-all rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100">
                      You already used free trial
                    </span>
                  )}
              </div>
            )}
          </div>
        </label>
      </div>
    </>
  );
};

export default SinglePackage;
