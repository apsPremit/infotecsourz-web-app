import Payment from "@/components/dashboard/package/Payment/Payment";
import React from "react";

const PackagePayment = (params) => {
  const price = parseFloat(params.searchParams.p);
  return (
    <div>
      <Payment price={price} path={"subscription"} />
    </div>
  );
};

export default PackagePayment;
