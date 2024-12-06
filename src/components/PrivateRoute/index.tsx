import { useAuthToken } from "@/store/useAuthTokenStore";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
