import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // You might want a loading state from your auth context
  // if (isLoading) return <Loader />;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;