import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role_type");
  const isAuthenticated = Boolean(token);

  if (isAuthenticated) {
    const redirectPath = userRole === "admin" ? "/dashboard" : "/products";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
