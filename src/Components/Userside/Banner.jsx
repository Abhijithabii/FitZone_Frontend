import React from "react";
import b1Image from "./img/b1.png"; //

function Banner() {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-3/5"></div>
      <div className="w-full h-80 bg-deep-purple-200">  </div>
      <div className=" absolute top-60">
        <h1 className=" pl-14 text-7xl pt-12 font-bold">The Fitness Club</h1>
        <h1 className=" pl-20 pt-5 text-5xl font-bold">In The Big City</h1>
        
      </div>
      <div className=" absolute top-40 right-20">
        <img src={b1Image} alt=" banner image" />
      </div>
    </div>
  );
}

export default Banner;
