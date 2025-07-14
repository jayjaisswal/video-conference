import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



// ✅ Create AuthContext
export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // const router = useNavigate();
  

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
        // router("/home")

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

  const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

     const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }


  // ✅ Provide the functions to context
  const value = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,addToUserHistory, getHistoryOfUser
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
