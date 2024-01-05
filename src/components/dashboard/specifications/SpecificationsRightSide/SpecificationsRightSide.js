"use client";
import { UserAuth } from "@/context/AuthProvider";
import { StateContext } from "@/context/StateProvider";
import { baseUrl } from "@/utils/functions/baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsUpload } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const SpecificationsRightSide = () => {
  const {
    productDetailsDescription,
    orderId,
    hasInstructions,
    setHasInstructions,
    setProductDetailsDescription,
    returnTime,
  } = useContext(StateContext);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = UserAuth();
  const router = useRouter();

  const handleProceed = () => {
    router.push("/dashboard/billing");
  };

  const handleInstructionUpload = async (e) => {
    setUploading(true);
    const files = e.target.files;

    const selectedFileArray = Array.from(files);
    const formData = new FormData();
    selectedFileArray.forEach((file) => formData.append("instructions", file));

    try {
      const res = await axios.post(
        `${baseUrl}/instructions?folderName=${orderId}&bucketName=${process.env.NEXT_PUBLIC_SAMPLE_BUCKET}`,
        formData
      );
      const data = await res.data;
      setUploading(false);
      if (data.success) {
        setHasInstructions(true);
      }
      toast.success("upload successful");
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("something wrong");
    }

    e.target.value = "";
  };

  return (
    <div>
      <div className=""></div>
      {/* text area  */}
      <div className="w-full mt-6">
        <label>
          <span className="text-black text-sm mb-4 ml-1">
            Detail Instruction <span className="text-red-500">*</span>
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

      <div className="mt-10">
        <h3 className="mb-3 text-md font-bold">
          Upload Your special Instruction or sample
        </h3>
        <label
          htmlFor="instructions"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
            hasInstructions
              ? "bg-blue-500 text-white hover:bg-blue-500"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          } `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3 text-center lg:text-start">
            <span className="text-2xl mb-3">
              <BsUpload />
            </span>
            <p className="mb-2 text-sm  dark:text-gray-400">
              <span className="font-semibold">
                Click to upload special instructions or sample
              </span>
            </p>
            <p className="text-xs  dark:text-gray-400">
              SVG, PNG, JPG, GIF or PDF
            </p>
            {isUploading && (
              <div className="flex items-center justify-center text-xl text-main">
                <ImSpinner2 className="animate-spin" />
              </div>
            )}
          </div>
          <input
            onChange={handleInstructionUpload}
            id="instructions"
            type="file"
            multiple
            name="instructions"
            disabled={hasInstructions}
            className="hidden disabled:cursor-not-allowed"
          />
        </label>
      </div>
      {/* btn proceed  */}
      <div className="flex mt-5 justify-end">
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
