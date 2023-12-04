import Loader from "@/components/shared/Loader/Loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  //   return <Loader />;
  <div className="h-screen flex justify-center items-center">
    <Loader />
  </div>;
}
