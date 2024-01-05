import moment from "moment";
import React from "react";

const AllSubscriptions = ({ subscriptions }) => {
  if (!subscriptions) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className=" text-2xl mb-3 ml-3 text-gray-700 medium  whitespace-nowrap">
        My Subscriptions
      </h1>
      <div className="bg-white p-10 rounded border">
        <div className="flex flex-col bg-white">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        Package
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        Credit
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                      >
                        Created Date
                      </th>
                      <th
                        scope="col"
                        className=" py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap "
                      >
                        Expiration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {subscriptions?.map((sub, i) => (
                      <tr key={sub._id} className="text-gray-700">
                        <td className="text-sm ">{i + 1}</td>
                        <td className="text-sm ">{sub?.orderId}</td>
                        <td className="text-sm ">{sub?.package}</td>
                        <td className="text-sm ">${sub?.grandTotal || "0"}</td>
                        <td className="text-sm ">{sub?.credit || "0"}</td>
                        <td className="text-sm">
                          {subscriptions[0] == sub ? "Active" : "Inactive"}
                        </td>
                        <td className="text-sm  ">
                          {moment(sub?.createdAt).format("MMM D, YYYY")}
                        </td>
                        <td className="text-sm  ">
                          {sub?.expiration &&
                            moment(sub?.expiration).format("MMM D, YYYY")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubscriptions;
