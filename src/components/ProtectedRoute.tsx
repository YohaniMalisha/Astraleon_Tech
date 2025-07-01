// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
