

import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" />; // redirect logged-in users
  }

  return children; // allow access to login/register
};

export default PublicRoute;
