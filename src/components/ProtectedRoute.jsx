import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // For public routes (login/signup pages)
  if (!requireAuth) {
    // If user is already authenticated, redirect to their appropriate dashboard
    if (isAuthenticated) {
      if (user?.role === "official") {
        return <Navigate to="/official/national-dashboard" replace />;
      }
      return <Navigate to="/citizen/dashboard" replace />;
    }
    // If not authenticated, show the requested public page
    return children;
  }

  // For protected routes
  if (requireAuth) {
    // If not authenticated at all, redirect to citizen login
    if (!isAuthenticated || !user) {
      return (
        <Navigate to="/citizen/login" replace state={{ from: location }} />
      );
    }

    // If route has role restrictions, enforce them
    if (allowedRoles?.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on actual role
        if (user.role === "official") {
          return <Navigate to="/official/national-dashboard" replace />;
        }
        return <Navigate to="/citizen/dashboard" replace />;
      }
    }
  }

  return children;
}
