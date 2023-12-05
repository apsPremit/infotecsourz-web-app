"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Something Went Wrong!</h1>
      <button>Try Again</button>
    </div>
  );
}
