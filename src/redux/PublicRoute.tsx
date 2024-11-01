import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Adjust the import path to your store file

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/superadmin" />;
  }

  return <Outlet />;
};

const IndexPublicRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/superadmin" />;
  }

  return <>{children}</>;
};

export { IndexPublicRoute, PublicRoute };
