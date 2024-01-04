"use client";
import { baseUrl } from "@/utils/functions/baseUrl";
import React, { useEffect, useState } from "react";
import SinglePackage from "../SinglePackage/SinglePackage";
import PricingTable from "@/components/shared/PricingTable/PricingTable";

const PricingPage = () => {
  const [allPackage, setAllPackage] = useState([]);
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${baseUrl}/package`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const result = await res.json();
        setAllPackage(result?.data);
      } catch (error) {
        throw new Error(error.message || "something went wrong");
      }
    };
    fetchPackage();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-10 mb-10">
        {allPackage?.map((plan) => (
          <SinglePackage key={plan._id} plan={plan} />
        ))}
      </div>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
