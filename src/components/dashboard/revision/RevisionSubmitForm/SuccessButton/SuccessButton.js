"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessButton = () => {
  const router = useRouter();
  const handleGoToDashboard = () => {
    router.refresh();
    router.replace("/dashboard");
  };
  return (
    <button
      onClick={handleGoToDashboard}
      className="px-3 py-2.5 my-5 bg-main hover:bg-mainHover text-white rounded"
    >
      Go to Dashboard
    </button>
  );
};

export default SuccessButton;
