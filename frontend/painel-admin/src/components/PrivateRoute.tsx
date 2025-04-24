import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = useAuthStore((state: { token: string | null }) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
