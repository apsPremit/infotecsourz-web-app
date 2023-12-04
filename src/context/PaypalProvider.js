"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_SB_API_KEY,
  currency: "USD",
  intent: "capture",
};

export const PaypalProvider = ({ children }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};
