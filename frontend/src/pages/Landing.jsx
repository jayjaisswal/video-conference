import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/photos/VideoCall.jpg"

const Landing = () => {
  return (
    <div className='h-screen w-screen bg-[url("./assets/photos/background.jpg")] bg-cover bg-center relative '>
      <div className=" w-11/12">
        <nav className="flex justify-between items-center">
          <div className="font-bold text-white">TalkSphere</div>
          <div className="flex gap-8 text-white items-center justify-center">
            <div className="cursor-pointer">Join as Guest</div>
            <button className="cursor-pointer">Register</button>
            <button className="cursor-pointer">Login</button>
          </div>
        </nav>

        <div className="flex">
        <div className=" mt-32  p-4 ml-32 mr-32">
          <p className="font-bold text-4xl text-white">Connect With Your</p>
          <p className="font-bold text-6xl text-red-700 ">Love Ones</p>
          <Link to="/auth">
            <button className="px-4 py-3 text-white bg-red-600 cursor-pointer mt-5 rounded-md hover:bg-red-500 hover:scale-95 transition-all duration-200 animate-bounce  delay-200">
              Get Started
            </button>
          </Link>
        </div>
        {/* <div className=" ">
            <img 
                src={Logo} 
                alt="PhoneCall"
                 className="w-1/2 h-full object-contain"  />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
