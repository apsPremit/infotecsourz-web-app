import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import Link from "next/link";
import OrderTable from "@/components/dashboard/dashboard/OrderTable/OrderTable";
import SubscribedPackage from "@/components/dashboard/dashboard/SubscribedPackage/SubscribedPackage";
import FreeTrialBox from "@/components/dashboard/dashboard/FreeTrialBox/FreeTrialBox";
import { getServerSession } from "next-auth/next";
import { nextOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import { baseUrl } from "@/utils/functions/baseUrl";
import Alert from "@/components/shared/Alert/Alert";

export const metadata = {
  title: "Dashboard | Infotecsourz",
  description: "Photo Retouching App",
};

const page = async (props) => {
  const session = await getServerSession(nextOption);
  if (!session) {
    return redirect("/login");
  }

  // const res = await fetch(`${baseUrl}/user/${session?.user?.email}`);
  // const data = await res.json();

  // const orderRes = await fetch(`${baseUrl}/order/${session?.user?.email}`);
  // const orderData = await orderRes.json();

  return (
    <div className="lg:p-5  bg-[#F5F5F5] ">
      {props?.searchParams?.message && (
        <Alert message={props?.searchParams?.message} />
      )}
      <SubscribedPackage />
      <div className="lg:grid grid-cols-3  mx-auto lg:gap-5 space-y-5 lg:space-y-0">
        <FreeTrialBox />
        <div className="border border-shadow p-5 rounded bg-white">
          <div className="">
            <p className="p-1.5 w-8 h-8 flex justify-center items-center bg-orange-200 text-orange-500 text-xl border border-red-20 rounded-full">
              <AiOutlineQuestionCircle className="" />
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold  text-lg">Create New Order</p>
            <h3 className="text  text-[#9f9f9f] text-sm">
              Let start your photo retouching project!
            </h3>
            <Link href="/dashboard/new_order">
              <button className="px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover">
                Create New Order
              </button>
            </Link>
          </div>
        </div>
        <div className="border border-shadow p-5 rounded bg-white">
          <div className="">
            <p className="p-1.5 w-8 h-8 flex justify-center items-center bg-pink-200 text-pink-500 text-xl border border-red-20 rounded-full">
              <LuMessagesSquare className="" />
            </p>
          </div>
          <div className="mt-3 ">
            <p className="font-bold  text-lg">Need Support</p>
            <h3 className="text  text-[#9f9f9f] text-sm">
              Facing any issue can get support
            </h3>
            <Link href="/dashboard/support">
              <button className="px-3 py-1.5 mt-3 bg-main text-white rounded hover:bg-mainHover  ">
                Support
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* recent orders  */}
      <h3 className="bg-white p-5 w-full my-5 font-bold text-lg">
        Recent Orders
      </h3>
      {/* table  */}
      <OrderTable />
      {/* notification  */}
    </div>
  );
};

export default page;
