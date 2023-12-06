"use client";
import React, { useState } from "react";

const Alert = ({ message }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show ? (
        <>
          <div
            role="alert"
            className="relative flex w-full lg:w-1/2 mx-auto px-4 py-4 text-base text-white bg-blue-500 rounded-lg font-regular mb-6"
            data-dismissible="alert"
          >
            <div className="mr-12 ">
              Congratulations, You got 5 credits free!
            </div>
            <button
              data-dismissible-target="alert"
              className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span
                onClick={() => setShow(false)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alert;
