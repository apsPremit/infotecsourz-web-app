import React from "react";
import SinglePackage from "@/components/dashboard/package/SinglePackage/SinglePackage";
import { baseUrl } from "@/utils/functions/baseUrl";
// import { baseUrl } from "@/utils/functions/baseUrl";
// import { baseUrl } from "@/utils/functions/baseUrl";

export const metadata = {
  title: "Billing Info | Infotecsourz",
  description: "Photo Retouching App",
};
const Pricing = async () => {
  console.log("url", `${baseUrl}/package`);
  const res = await fetch(`${baseUrl}/package`);
  const result = await res.json();

  const allPackage = result.data || [];

  return (
    <div>
      <h1 className="text-3xl mt-5 mb-10 font-bold text-center">
        Our exclusive subscription packages only made for you
      </h1>
      {/* <h1>{error.message}</h1> */}
      {allPackage?.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10 mb-10">
          {allPackage?.map((plan) => (
            <SinglePackage key={plan._id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pricing;
