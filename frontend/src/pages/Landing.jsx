import React from "react";

import Logo from "../assets/photos/VideoCall.jpg";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const router = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('../assets/photos/background.jpg')]">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-4">
          <div
            onClick={() => {
              router("/");
            }}
            className="text-2xl font-bold text-white tracking-wide cursor-pointer"
          >
            TalkSphere
          </div>
          <div className="hidden md:flex gap-6 text-white text-sm items-center">
            <div
              onClick={() => {
                router("/aljk23");
              }}
              className="cursor-pointer hover:underline"
            >
              Join as Guest
            </div>
            <button
              onClick={() => {
                router("/auth");
              }}
              className="hover:text-red-400 transition cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={() => {
                router("/auth");
              }}
              className="hover:text-red-400 transition cursor-pointer"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-10">
          {/* Text Section */}
          <div className="text-white mt-10 md:mt-0 md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Connect With Your <br />
              <span className="text-red-500">Loved Ones</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Real-time video chat, anywhere, anytime. Stay close no matter the
              distance.
            </p>
            <Link to="/auth">
              <button className=" cursor-pointer mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md text-lg font-semibold transition-all duration-200 hover:scale-95 animate-bounce delay-200">
                Get Started
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src={Logo}
              alt="Video Call"
              className="w-full max-w-md mx-auto rounded-xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
