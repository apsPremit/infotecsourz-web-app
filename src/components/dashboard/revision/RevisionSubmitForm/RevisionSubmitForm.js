"use client";
import { baseUrl } from "@/utils/functions/baseUrl";
import { useRouter } from "next/navigation";
import React from "react";

const RevisionForm = ({ details }) => {
  console.log("details from from", details);
  const router = useRouter();
  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const formData = {
      orderId: details.orderId,
      email: details.email,
      description,
    };
    try {
      const response = await fetch(`${baseUrl}/revision`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("revision result", result);

      if (result.success) {
        router.push(`/dashboard/revision/success?orderId=${details?.orderId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-white rounded w-full lg:w-1/2 p-10 ">
      <h1 className="text-center text-xl mb-3 font-semibold">
        Revision Request
      </h1>
      <form onSubmit={handleRevisionSubmit}>
        <div className="mb-5">
          <label className="block mb-1 text-sm" htmlFor="loginEmail">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={details?.email}
            readOnly
            type="email"
            id="loginEmail"
            name="email"
            className=" w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-1 text-sm" htmlFor="loginEmail">
            OrderId<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={details.orderId}
            readOnly
            type="text"
            id="orderId"
            name="orderId"
            className=" w-full  border rounded-md outline-0 border-shadow py-2 px-3 focus:border-main"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Details
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Details..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-main hover:bg-mainHover py-2 px-3 text-white rounded mt-10"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RevisionForm;
