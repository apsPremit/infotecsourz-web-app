import RevisionForm from "@/components/dashboard/revision/RevisionSubmitForm/RevisionSubmitForm";
import Loader from "@/components/shared/Loader/Loader";
import { baseUrl } from "@/utils/functions/baseUrl";
import React, { Suspense } from "react";

const fetchOrder = async (orderId) => {
  try {
    const res = await fetch(`${baseUrl}/order/details/${orderId}`, {
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const Revision = async ({ params }) => {
  const { id } = params;
  const details = await fetchOrder(id);

  return (
    <div className=" flex items-center justify-center">
      <Suspense fallback={<Loader />}>
        <RevisionForm details={details} />
      </Suspense>
    </div>
  );
};

export default Revision;
