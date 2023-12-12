"use client";

const Error = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center space-y-3 ">
      <h2>Something Went wrong</h2>
      <button className="px-2 bg-shadow py-1.5 rounded" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};
export default Error;
