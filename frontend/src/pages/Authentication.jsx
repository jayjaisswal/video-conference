import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Auth from "../assets/photos/Auth2.jpg"; // 🔁 Replace with your image path
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const SignupLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { handleRegister, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset(); // Clear inputs when toggling
  };

  //   const onSubmit = (data) => {
  //     const cleanedData = isLogin
  //       ? {
  //           username: data.username,
  //           password: data.password,
  //         }
  //       : data;

  //     console.log(isLogin ? "Logging in..." : "Signing up...", cleanedData);
  //   };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const { name, username, password } = data;

      if (!isLogin) {
        const response = await handleRegister(name, username, password);
        console.log("Signup response", response);
        reset();
      } else {
        const response = await handleLogin(username, password);
        console.log("Login response", response);
        if (response.data.success) {
          reset();
          navigate('/home')
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img src={Auth} alt="Auth" className="w-full h-screen object-cover" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={toggleMode}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
