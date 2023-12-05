"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/utils/functions/baseUrl";
import { useContext, useState } from "react";
import { StateContext } from "@/context/StateProvider";

const Payment = ({ path }) => {
  const { orderDetails } = useContext(StateContext);
  const router = useRouter();

  const createOrder = async (data) => {
    return fetch(`${baseUrl}/payment/create-payment-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: {
          description: orderDetails?.orderId,
          cost: orderDetails?.grandTotal?.toFixed(2),
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${baseUrl}/payment/capture-payment-order/${data?.orderID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: orderDetails.orderId,
        orderDetails,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const paymentResponse = await response.json();
          const oderData = {
            ...orderDetails,
            paymentStatus: "paid",
            transactionId: paymentResponse.id,
          };
          try {
            const res = await fetch(`${baseUrl}/${path}`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(oderData),
            });
            if (res.ok) {
              router.push(`/order_success?orderId=${orderDetails?.orderId}`);
            }
          } catch (error) {
            Swal.fire({
              title: "something went wrong ",
              icon: "error",
            });
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleError = (err) => {
    Swal.fire({
      title: "something went wrong on payment process",
      text: `${err?.message || ""}`,
      icon: "error",
    });
  };

  return (
    <div className="h-screen  mt-10 lg:mt-20 ">
      <div className="border w-full md:w-2/5  mx-auto bg-white p-10 rounded shadow-lg">
        <PayPalButtons
          style={{
            label: "checkout",
          }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onError={(err) => handleError(err)}
        ></PayPalButtons>
      </div>
    </div>
  );
};

export default Payment;
