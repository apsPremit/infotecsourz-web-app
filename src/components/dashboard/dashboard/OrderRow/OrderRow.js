"use client";
import { baseUrl } from "@/utils/functions/baseUrl";
import axios from "axios";
import moment from "moment";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { RxDotFilled } from "react-icons/rx";

const OrderRow = ({ order }) => {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const {
    _id,
    orderId,
    orderName,
    grandTotal,
    status,
    createdAt,
    returnTime,
    paymentStatus,
    invoiceStatus,
    deliveredFileUrl,
  } = order || {};

  const bucketName = process.env.NEXT_PUBLIC_ADMIN_UPLOAD_IMAGE_BUCKET;

  const handleDownload = () => {
    setDownloading(true);
    axios
      .get(`${baseUrl}/image?bucketName=${bucketName}&folderName=${orderId}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("download", `${orderId}.zip`);
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      })
      .catch((error) => {
        console.log("download error", error);
        alert("did not find any files");
        setDownloading(false);
      });
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-500 ">
        {orderId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-500 ">
        {orderName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black ">
        {/* {status == "delivered" ||
          (status == "in-revision" &&
            (deliveredFileUrl ? (
              <Link target="_blank" href={deliveredFileUrl}>
                <button className="text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded">
                  Download
                </button>
              </Link>
            ) : (
              <button
                onClick={handleDownload}
                className="text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded"
              >
                {downloading ? (
                  <span className="flex items-center justify-center  text-xs text-white">
                    Downloading{" "}
                    <ImSpinner2 className="animate-spin ml-2 text-white" />
                  </span>
                ) : (
                  "Download"
                )}
              </button>
            )))} */}

        {status === "delivered" || status == "in-revision" ? (
          <button
            onClick={handleDownload}
            className="text-xs px-1.5 py-1 bg-main hover:bg-mainHover text-white rounded"
          >
            {downloading ? (
              <span className="flex items-center justify-center  text-xs text-white">
                Downloading{" "}
                <ImSpinner2 className="animate-spin ml-2 text-white" />
              </span>
            ) : (
              "Download"
            )}
          </button>
        ) : (
          ""
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm     ">
        <span
          className={`flex items-center p-1  ${
            status === "denied"
              ? "text-red-500 bg-red-100"
              : status == "in-revision"
              ? "text-pink-500  bg-pink-100"
              : "text-green-500 bg-green-100"
          }`}
        >
          <span className=" text-xl ">
            <RxDotFilled />
          </span>
          <span className="">{status}</span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        {moment(createdAt).format("MMM Do YY, h:mm:ss a")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        {returnTime && returnTime + " Hours"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        <Link href={`/dashboard/order/${orderId}`} className="hover:underline">
          View
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        {paymentStatus}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        {status === "delivered" && (
          <Link className="underline" href={`/dashboard/invoice/${orderId}`}>
            Invoice
          </Link>
        )}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm   text-black  ">
        {status == "in-revision" ? (
          <p>Request Sent</p>
        ) : status == "delivered" ? (
          <Link className="underline" href={`/dashboard/revision/${orderId}`}>
            Send Request
          </Link>
        ) : (
          ""
        )}

        {/* <Link className="underline" href={`/dashboard/revision/${orderId}`}>
            Send Request
          </Link> */}
      </td>
    </tr>
  );
};

export default OrderRow;
