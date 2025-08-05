import React from "react";

// A reusable arrow icon for the button
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-4 h-4 ml-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);

const NavBar = () => {
  return (
    <header className="absolute top-1 left-3 right-0 bg-transparent backdrop-blur-sm pointer-events-auto">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="h-10 w-10 bg-gray-900"></div>
        {/* Get in Touch Button */}
        <button className="bg-gray-800 text-white font-semibold py-2 px-5 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 transition-colors duration-200">
          Get In Touch
          <ArrowIcon />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
