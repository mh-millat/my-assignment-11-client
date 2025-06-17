
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading state while auth status is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <span className="text-xl font-medium">Loading...</span> */}
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  // Redirect to login if not authenticated, preserving intended route
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;
