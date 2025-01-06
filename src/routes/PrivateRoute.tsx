import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const location = useLocation();
  const userRole = localStorage.getItem("role_type");
  const token = localStorage.getItem("token");

  if (!userRole || !token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
