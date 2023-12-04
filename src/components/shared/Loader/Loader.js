import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex items-center justify-center text-xl text-main">
      <ImSpinner2 size={35} className="animate-spin" />
    </div>
  );
};

export default Loader;
