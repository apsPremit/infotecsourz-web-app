import React from "react";
import Link from "next/link";
import BtnAllFacilities from "@/components/shared/BtnAllFacilities/BtnAllFacilities";
import { SubscribeButton } from "@/components/shared/SubscribeButton/SubscribeButton";
import { baseUrl } from "@/utils/functions/baseUrl";

const fetchPlan = async (package_name) => {
  try {
    const res = await fetch(`${baseUrl}/package/single/${package_name}`);
    const plan = await res.json();
    return plan.data;
  } catch (error) {
    console.log("fetch failed from plans", error);
  }
};

const Plans = async () => {
  const plan = await fetchPlan("free trial");

  const { facilities } = plan || {};
  return (
    <div className=" w-full lg:w-3/4 mx-auto mb-[120px]">
      <h1 className="text-capitalize font-bold text-center mt-3 mb-5 text-3xl">
        Welcome to Photo Retouching app!
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <div className="bg-white rounded border p-10">
          <div className="text-center">
            <h1 className="text-xl mb-5 font-bold ">Start Free Trial</h1>
            <p>
              Enjoy 3 free credits on us to elevate your photos with our Photo
              Retouching App – a special gift just for you! your trial is valid
              for 14 days!
            </p>
            <div className="flex justify-center">
              <BtnAllFacilities facilities={facilities} />
            </div>
            <Link href={`/dashboard/pricing/billing?package=${plan?._id}`}>
              <SubscribeButton />
            </Link>
          </div>
        </div>
        <div className="bg-white rounded border p-10 text-center">
          <div>
            <h1 className="text-xl mb-5 font-bold ">See All Packages</h1>
            <p>
              Explore our complete range of packages by clicking here, and
              unlock the full potential of photo enhancement tailored just for
              you.
            </p>
            <Link href="/dashboard/pricing">
              <button className="bg-blue-400 hover:bg-blue-500 text-white mt-5 w-full py-2 ">
                See All Packages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
