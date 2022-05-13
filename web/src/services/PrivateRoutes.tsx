import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const PrivateRoutes = () => {
  const { signed } =  useAuth();
  return signed ? <Outlet /> : <Navigate to="/" />;
};