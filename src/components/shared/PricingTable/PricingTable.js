"use client";
import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { StateContext } from "@/context/StateProvider";

const PricingTable = () => {
  let { isShowPricingModal, setShowPricingModal } = useContext(StateContext);

  const modelCostOptions = {
    initial: 0.45,
    psdFormate: 0.5,
    resizing: 0.25,
    background: 0.25,
    masking: 0.5,
    clipping: 0.39,
    pimplesRemove: 0.3,
    wrinklesRemove: 0.4,
    teethRetouching: 0.25,
    hairFixing: 0.4,
    beautyMakeup: 0.8,
    redEyeFixing: 0.4,
    clothFixing: 0.3,
    bodyShaping: 0.4,
  };
  const productCostOptions = {
    initial: 0.39,
    psdFormate: 0.5,
    resizing: 0.2,
    background: 0.25,
    masking: 0.3,
    clipping: 0.29,
    shadow: 0.4,
    reflection: 0.5,
    ghostMannequin: 0.45,
    colorCorrection: 0.29,
    colorVariant: 0.5,
    productRetouching: 0.6,
  };

  const returnTimeCostObj = {
    12: 1,
    24: 0.8,
    48: 0.5,
    72: 0,
  };

  function closeModal() {
    setShowPricingModal(false);
  }

  function openModal() {
    setShowPricingModal(true);
  }

  const formatPropertyName = (propertyName) => {
    // Use a regular expression to insert a space before uppercase letters
    return propertyName.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <>
      <Transition appear show={isShowPricingModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl underline  mb-3  leading-6 text-gray-900 text-center font-bold"
                  >
                    Price Table
                  </Dialog.Title>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    <div className="mt-2">
                      <h3 className="font-medium text-lg mb-5">
                        Costs for Product
                      </h3>
                      <ul className="list-disc list-inside">
                        {Object.entries(productCostOptions).map(
                          ([option, cost]) => (
                            <li
                              className="text-sm py-1 whitespace-nowrap capitalize"
                              key={option.split()}
                            >
                              {formatPropertyName(option)}
                              <span className="px-2">=</span>${cost}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-lg mb-5">
                        Costs for Model
                      </h3>
                      <ul className="list-disc list-inside capitalize">
                        {Object.entries(modelCostOptions).map(
                          ([option, cost]) => (
                            <li
                              className="text-sm py-1 whitespace-nowrap"
                              key={option}
                            >
                              {formatPropertyName(option)}
                              <span className="px-2">=</span>${cost}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* turn around time  */}
                    {/* turn around time  */}
                    <div className="mt-2">
                      <h3 className="font-medium text-lg mb-5   whitespace-nowrap">
                        Costs for Turn Around Time
                      </h3>
                      <ul className="list-disc list-inside capitalize">
                        {Object.entries(returnTimeCostObj).map(
                          ([option, cost]) => (
                            <li className="text-sm py-1 " key={option}>
                              {formatPropertyName(option)} <span>Hours</span>
                              <span className="px-2">=</span>${cost}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-main text-white hover:bg-mainHover px-2.5 py-1.5 rounded outline-0 border-0"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PricingTable;
