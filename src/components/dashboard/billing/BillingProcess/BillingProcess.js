"use client";
import { UserAuth } from "@/context/AuthProvider";
import { StateContext } from "@/context/StateProvider";
import { baseUrl } from "@/utils/functions/baseUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const BillingProcess = ({
  subTotal,
  perPhotoCost,
  grandTotal,
  taxTotal,
  remainingCredit,
  totalPhotos,
}) => {
  const router = useRouter();
  const [isAgree, setAgree] = useState(false);
  const { userData } = UserAuth() || {};
  const [processing, setProcessing] = useState(false);

  const {
    uploadedImages,
    photoType,
    selectedPackage,
    orderId,
    productDetailsDescription,
    fileUrl,
    photoRequirements,
    orderName,
    taxRate,
    returnTime,
    hasInstructions,
    paymentMethod,
    setOrderDetails,
  } = useContext(StateContext);

  const orderDetails = {
    orderId: orderId,
    orderName: orderName,
    name: userData?.name,
    email: userData?.email,
    country: userData.country,
    photoType,
    package: selectedPackage?.package_name || userData?.subscribedPackage,
    photoQuantity: parseInt(totalPhotos),
    perPhotoCost,
    subTotal,
    taxRate,
    taxTotal,
    grandTotal,
    productDetailsDescription,
    fileUrl,
    photoRequirements,
    returnTime,
    hasInstructions: hasInstructions,
    paymentMethod,
  };

  const placeOrder = async () => {
    setProcessing(true);
    const orderData = { ...orderDetails, paymentStatus: "paid" };
    try {
      const res = await fetch(`${baseUrl}/order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          orderData,
          paymentDetails: userData?.paymentDetails || {},
        }),
      });

      if (!res.ok) {
        setProcessing(false);
        throw new Error("something went wrong");
      }
      setProcessing(false);
      router.push(`/order_success?orderId=${orderData?.orderId}`);
    } catch (error) {
      console.log("error", error);
      setProcessing(false);
      Swal.fire({
        title: "something went wrong ",
        icon: "error",
      });
    }
  };

  const calculateExtraPrice = () => {
    if (orderDetails?.package === "free trial") {
      const extra = grandTotal - userData?.remainingBalance;
      const extraTax = (extra * taxRate) / 100;
      const extraCost = extra + extraTax;
      return { extraCost, extraTax };
      // const extraSubtotal = grandTotal - userData?.remainingBalance;
      // const extraTax = (extraSubtotal * taxRate) / 100;
      // const extraGrandTotal = extraSubtotal + extraTax;
      // return { extraSubtotal, extraSubtotal, extraGrandTotal };
    } else {
      const extraPhoto =
        orderDetails?.photoQuantity - userData?.remainingCredit;
      const extra = extraPhoto * perPhotoCost;
      console.log("extra photo", extraPhoto);
      const extraTax = (extra * taxRate) / 100;
      const extraCost = extra + extraTax;
      return { extraCost, extraTax };
      // const extraPhoto =
      //   orderDetails?.photoQuantity - userData?.remainingCredit;
      // const extraSubtotal = extraPhoto * perPhotoCost;
      // const extraTax = (extraSubtotal * taxRate) / 100;
      // const extraGrandTotal = extraSubtotal + extraTax;
      // return { extraSubtotal, extraTax, extraGrandTotal };
    }
  };

  const showModal = (extraCost = 0, extraTax = 0) => {
    Swal.fire({
      icon: "error",
      title: "You have not require credit",
      html: `<p>You don't have enough credit. You can update your package if you want or you can complete the order by paying <strong className="text-green-500 font-bold">$${extraCost?.toFixed(
        2
      )}</strong>.</p>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      denyButtonText: `Upgrade Package`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderData = { ...orderDetails };
        if (orderData?.package === "free trial") {
          if (userData?.remainingBalance < 1) {
            orderData.grandTotal = 0;
          }
        } else {
          if (userData?.remainingCredit < 1) {
            orderData.grandTotal = 0;
          }
        }
        orderData.grandTotal += extraCost;

        setOrderDetails(orderData);
        console.log("order data", orderData);
        router.push(`/dashboard/billing/payment?p=${extraCost}`);
      } else if (result.isDenied) {
        router.push("/dashboard/pricing");
      }
    });
  };
  const confirmOrder = async () => {
    const pack = orderDetails.package;
    if (pack === "free trial") {
      if (grandTotal > userData?.remainingBalance) {
        const extraPrices = calculateExtraPrice();
        showModal(extraPrices?.extraCost, extraPrices?.extraTax);
      } else {
        await placeOrder();
      }
    } else if (pack === "pay as go") {
      setOrderDetails(orderDetails);
      return router.push(
        `/dashboard/billing/payment?p=${orderDetails?.grandTotal}`
      );
    } else {
      if (orderDetails?.photoQuantity > userData?.remainingCredit) {
        const extraPrices = calculateExtraPrice();
        showModal(extraPrices?.extraCost, extraPrices?.extraTax);
      } else {
        await placeOrder();
      }
    }
  };

  return (
    <div>
      <button
        disabled={!isAgree || processing}
        onClick={confirmOrder}
        className="w-full text-center text-white disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-500 rounded-lg py-3 text-lg hover:bg-blue-400 cursor-pointer"
      >
        {processing ? "Processing..." : " ConfirmOrder"}
      </button>

      {/* terms and conditions */}
      <label
        htmlFor="agree_terms"
        className="flex items-start gap-x-4 px-2 mt-3 cursor-pointer"
      >
        <input
          onChange={() => setAgree(!isAgree)}
          id="agree_terms"
          checked={isAgree}
          type="checkbox"
          className="scale-125 mt-1"
        />
        <p className="text-sm">
          I accept{" "}
          <Link
            target="_blank"
            href="https://www.infotecsourz.com/terms-and-conditions/"
            className="text-main hover:underline"
          >
            Terms & Conditions
          </Link>
        </p>
      </label>
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <Toaster />
    </div>
  );
};

export default BillingProcess;
