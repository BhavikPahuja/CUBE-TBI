import React from "react";

const Spinner3 = () => {
  return (
    <div className="animate-[spin_15s_linear_infinite] text-black flex items-center justify-center w-15 h-15 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="absolute inset-0"
      >
        <path
          fill="none"
          stroke="currentColor"
          d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
          vectorEffect="non-scaling-stroke"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner3;
