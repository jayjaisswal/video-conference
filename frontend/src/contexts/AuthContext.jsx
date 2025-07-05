import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


// ✅ Create AuthContext
export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  

  // ✅ Registration function
  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/singup", {
        name,
        username,
        password,
      });

      if (response.data.success) {
        toast.success("Registered Successfully!");
        return response;
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      console.error(error);
    }
  };

  // ✅ Login function
  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        setUserData(response.data); // optional
        toast.success("Login Successful");
        
        
        return response;
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.error(error);
      
    }
  };

  // ✅ Provide the functions to context
  const value = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
