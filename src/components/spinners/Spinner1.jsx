import React from "react";

const Spinner1 = () => {
  return (
    <div className="flex h-15 w-15 items-center justify-center">
      <div className="flex items-center justify-center w-10 h-10 relative text-gray-800">
        <div
          className="absolute -inset-2 animate-spin"
          style={{ animationDuration: "30s" }}
        >
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "20s", animationDirection: "reverse" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="absolute inset-0 w-full h-full"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="absolute inset-0 w-full h-full"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Spinner1;
