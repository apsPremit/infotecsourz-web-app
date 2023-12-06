"use client";
import { UserAuth } from "@/context/AuthProvider";
import { StateContext } from "@/context/StateProvider";
import moment from "moment/moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const SpecificationsRightSide = () => {
  const {
    orderName,
    totalFileSize,
    productDetailsDescription,
    photoType,
    setProductDetailsDescription,
    uploadedImages,
    imageQuantityFromUrl,
    selectedPackage,
    setReturnTime,
    returnTime,
    perPhotoCost,
  } = useContext(StateContext);
  const { userData } = UserAuth();
  const router = useRouter();

  const fields = [
    { label: "Order Name", value: orderName, type: "text" },
    { label: "Owner", value: userData?.name, type: "text" },
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
    { label: "Owned By", value: userData?.name, type: "text" },
    { label: "Location", value: userData?.email, type: "text" },
  ];

  const returnTimeOptions = [
    { label: "Select return time", value: 0, cost: 0 },
    { label: "12 Hours", value: 12, cost: 1 },
    { label: "24 Hours", value: 24, cost: 0.8 },
    { label: "48 Hours", value: 48, cost: 0.5 },
    { label: "72 Hours", value: 72, cost: 0 },
  ];

  const handleProceed = () => {
    router.push("/dashboard/billing");
  };

  const handleReturnTime = (e) => {
    setReturnTime(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <div key={index}>
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
      </div>

      <label>
        <div className="flex justify-between items-center">
          <span className="text-black text-sm mt-4 mb-1 ml-1 block">
            Select Turn Around Time
            <span className="text-red-500 text-lg">*</span>
          </span>
          <span className=" text-sm mt-4 mb-1 ml-1 block bg-main text-white px-3">
            Per Photo Cost:
            <span className=" text-lg font-bold ml-2 "> ${perPhotoCost}</span>
          </span>
        </div>
        <select
          required
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

      {/* text area  */}
      <div className="w-full my-10">
        <label>
          <span className="text-black text-sm mb-4 ml-1">
            Detail Instruction
          </span>
          <textarea
            defaultValue={productDetailsDescription}
            name=""
            id=""
            onBlur={(e) => setProductDetailsDescription(e.target.value)}
            rows={5}
            className="border border-shadow text-[#9d9c9c] outline-0 w-full px-5 py-3 focus:border-main focus:rounded"
          ></textarea>
        </label>
      </div>

      {/* btn proceed  */}
      <div className="flex  justify-end">
        <button
          disabled={!returnTime}
          onClick={handleProceed}
          className="text-white px-3.5 py-2 bg-main hover:bg-mainHover rounded flex disabled:cursor-not-allowed disabled:bg-mainHover"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SpecificationsRightSide;
