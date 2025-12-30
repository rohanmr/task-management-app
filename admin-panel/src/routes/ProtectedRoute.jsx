// import { Navigate, Outlet } from "react-router-dom";

// import React from "react";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import { userContext } from "@/context/userProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useContext(userContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // if roles are specified and user's role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
