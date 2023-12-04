"use client";
import { InboxIcon } from "@heroicons/react/20/solid";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { useLocation } from "react-router-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/utils/functions/baseUrl";
import { serverRuntimeConfig } from "../../../../../next.config";

const Payment = () => {
  const searchParams = useSearchParams();
  const result = searchParams.entries();
  let orderDetails = [];
  for (const [key, value] of searchParams.entries()) {
    const pair = { key: value };
    orderDetails.push();
  }
  //   const location = useLocation();
  //   const { orderId, price } = location.state;
  const router = useRouter();

  const orderId = "dfd";
  const price = 20;

  const createOrder = async (data) => {
    console.log("createOrder function called", data);
    // Order is created on the server and the order id is returned
    return fetch(`${baseUrl}/payment/create-payment-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cart: {
          description: "order",
          cost: 20,
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${url}/payment/capture-payment-order/${data?.orderID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then(async (response) => {
        const paymentResult = await response.json();
        console.log("payment", paymentResult);
        try {
          const res = await fetch(`${url}/subscription/payment/${orderId}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              status: "paid",
              transactionId: paymentResult?.id,
            }),
          });
          console.log("res", res);
          if (res.ok) {
            router.push(`/order_success/${orderId}`);
          }
        } catch (error) {
          console.log("payment error", error);
        }
        return response.json();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="h-screen flex items-center ">
      <div className="border w-full md:w-1/2 lg:w-2/5 mx-auto bg-white p-10 rounded shadow-lg">
        <PayPalButtons
          style={{
            label: "checkout",
          }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        ></PayPalButtons>
      </div>
    </div>
  );
};

export default Payment;
