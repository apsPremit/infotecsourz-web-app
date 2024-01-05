"use client";
import { StateContext } from "@/context/StateProvider";
import moment from "moment";
import React, { useContext } from "react";

const SpecificationsLeftSide = () => {
  const {
    orderName,
    uploadedImages,
    imageQuantityFromUrl,
    setReturnTime,
    returnTime,
  } = useContext(StateContext);

  const fields = [
    { label: "Order Name", value: orderName, type: "text" },

    {
      label: "Product Uploaded",
      value:
        imageQuantityFromUrl > 0 ? imageQuantityFromUrl : uploadedImages.length,
      type: "text",
    },
    {
      label: "Created",
      value: moment(new Date()).format("MMM Do YY"),
      type: "text",
    },
  ];
  const returnTimeOptions = [
    { label: "Select return time", value: 0, cost: 0 },
    { label: "12 Hours", value: 12, cost: 1 },
    { label: "24 Hours", value: 24, cost: 0.8 },
    { label: "48 Hours", value: 48, cost: 0.5 },
    { label: "72 Hours", value: 72, cost: 0 },
  ];
  const handleReturnTime = (e) => {
    setReturnTime(parseInt(e.target.value));
  };

  return (
    <div>
      <div>
        <h3 className="font-bold text-xl mb-3">Review Order</h3>
        <p className="">
          Check your order details that you’ve uploaded. Make sure all details
          are perfect.
        </p>
      </div>
      <div className="mt-8">
        {fields.map((field, index) => (
          <div className="my-3" key={index}>
            <label>
              <span className="text-black text-sm mb-4 ml-1">
                {field?.label}
              </span>
              <input
                type={field?.type}
                value={field?.value}
                className="border border-shadow text-[#9d9c9c] w-full px-3 py-1.5 rounded outline-0 focus:rounded focus:border-main cursor-not-allowed"
                disabled
              />
            </label>
          </div>
        ))}
        <label>
          <span className="text-black text-sm mt-4 mb-1 ml-1 block">
            Select Turn Around Time
            <span className="text-red-500">*</span>
          </span>
          <select
            onChange={handleReturnTime}
            name=""
            id=""
            className="w-full border border-shadow text-[#9d9c9c] px-3 py-1.5 rounded"
          >
            {returnTimeOptions.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default SpecificationsLeftSide;
