import React from "react";
import b1Image from "../../../img/b1.png"; //

function Banner() {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-3/5"></div>
      <div className="w-full h-80 hidden lg:block bg-deep-purple-200">  </div>
      <div className=" absolute top-24 lg:top-60 grid grid-cols-1 lg:grid-cols-2">
        <div>
        <h1 className=" lg:pl-14 text-7xl lg:pt-12 font-bold">The Fitness Club</h1>
        <h1 className=" lg:pl-20 pt-5 text-5xl font-bold">In The Big City</h1>
        </div>
        <div className=" flex justify-center">
        <img className=" ml-auto" src={b1Image} alt=" banner image" />
      </div>
        
      </div>
      
    </div>
  );
}

export default Banner;
