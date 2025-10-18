import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  if (!isAuthenticated && pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
