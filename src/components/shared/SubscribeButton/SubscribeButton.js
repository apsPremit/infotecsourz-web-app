"use client";
import { UserAuth } from "@/context/AuthProvider";

export const SubscribeButton = () => {
  const { userData } = UserAuth();
  return (
    <button
      disabled={
        userData?.isAvailableFreeTrial === undefined ||
        userData?.isAvailableFreeTrial == "" ||
        userData?.isAvailableFreeTrial === false
      }
      className="bg-blue-400 hover:bg-blue-500 text-white mt-5 w-full py-2 disabled:bg-blue-200 "
    >
      Get Free Trial
    </button>
  );
};
