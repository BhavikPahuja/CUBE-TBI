import React from "react";

const Spinner2 = () => {
  return (
    <div className="animate-[spin_15s_linear_infinite] text-black flex items-center justify-center w-15 h-15 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="absolute inset-0"
      >
        <circle
          cx="32"
          cy="32"
          r="24"
          fill="none"
          stroke="currentColor"
          stroke-dasharray="5 3"
          vectorEffect="non-scaling-stroke"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner2;
