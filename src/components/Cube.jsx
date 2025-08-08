import React from "react";
import c1 from "../media/c1.png";
import c2 from "../media/c2.png";

const Cube = () => {
  return (
    <div className="w-[350px] h-[350px] [perspective:1000px] mb-[4vh] transition-transform duration-300 ease-in-out hover:scale-110">
      <div className="relative w-full h-full [transform-style:preserve-3d] animate-spin-y">
        {/* Front face */}
        <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black border border-white/20 [transform:rotateY(0deg)_translateZ(175px)]">
          <img
            src={c1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Back face */}
        <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black border border-white/20 [transform:rotateY(180deg)_translateZ(175px)]">
          <img
            src={c1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right face */}
        <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black border border-white/20 [transform:rotateY(90deg)_translateZ(175px)]">
          <img
            src={c2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left face */}
        <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black border border-white/20 [transform:rotateY(-90deg)_translateZ(175px)]">
          <img
            src={c2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Top face */}
        <div className="absolute w-full h-full bg-black border border-white/20 [transform:rotateX(90deg)_translateZ(175px)]"></div>
        {/* Bottom face */}
        <div className="absolute w-full h-full bg-black border border-white/20 [transform:rotateX(-90deg)_translateZ(175px)]"></div>
      </div>
    </div>
  );
};

export default Cube;
