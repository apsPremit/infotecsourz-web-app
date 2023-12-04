import React from "react";
import SinglePackage from "@/components/dashboard/package/SinglePackage/SinglePackage";
import { baseUrl } from "@/utils/functions/baseUrl";

export const metadata = {
  title: "Billing Info | Infotecsourz",
  description: "Photo Retouching App",
};
const Pricing = async (props) => {
  const getPackage = async () => {
    try {
      const res = await fetch(`${baseUrl}/package`, { cache: "no-store" });
      const data = await res.json();
      return data?.data;
    } catch (error) {
      throw new Error(error.message || "something went wrong");
    }
  };

  const packages = await getPackage();

  return (
    <div>
      <h1 className="text-3xl mt-5 mb-10 font-bold text-center">
        Our exclusive subscription packages only made for you
      </h1>
      {/* <h1>{error.message}</h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10 mb-10">
        {packages.map((plan) => (
          <SinglePackage key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
