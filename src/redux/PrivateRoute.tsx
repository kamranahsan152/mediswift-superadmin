import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const PrivateRoute = ({ requiredRole, children }: any) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.user
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth/jwt/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/401" />;
  }

  return children;
};

export default PrivateRoute;
