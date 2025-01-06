import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
