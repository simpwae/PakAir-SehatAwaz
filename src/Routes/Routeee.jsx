import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import CitizenLayout from "../layouts/CitizenLayout";
import OfficialLayout from "../layouts/OfficialLayout";

// Lazy load components for code splitting
const NationalDashboard = lazy(() => import("../pages/official/NationalDashboard"));
const SettingsPage = lazy(() => import("../pages/official/SettingsPage"));
const LoginOfficial = lazy(() => import("../pages/official/LoginOfficial"));
const LoginPage = lazy(() => import("../pages/citizen/LoginPage"));
const SignupPage = lazy(() => import("../pages/citizen/SignupPage"));
const Dashboard = lazy(() => import("../pages/citizen/Dashboard"));
const CitizenHealthGuidance = lazy(() => import("../pages/citizen/HealthGuidance"));
const CitizenRegionalMap = lazy(() => import("../pages/citizen/RegionalMap"));
const CitizenReportSmog = lazy(() => import("../pages/citizen/ReportSmog"));
const CitizenSettings = lazy(() => import("../pages/citizen/Settings"));
const Logout = lazy(() => import("../pages/Logout"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function Routeee() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
      {/* Public landing route - redirects based on auth status */}
      <Route
        path="/"
        element={
          <ProtectedRoute requireAuth={false}>
            <Navigate to="/citizen/login" replace />
          </ProtectedRoute>
        }
      />

      {/* Citizen Authentication Routes */}
      <Route
        path="/citizen/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/signup"
        element={
          <ProtectedRoute requireAuth={false}>
            <SignupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/*"
        element={
          <ProtectedRoute requireAuth={true} allowedRoles={["citizen"]}>
            <CitizenLayout>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/citizen/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/report" element={<CitizenReportSmog />} />
                <Route path="/health" element={<CitizenHealthGuidance />} />
                <Route path="/map" element={<CitizenRegionalMap />} />
                <Route path="/settings" element={<CitizenSettings />} />
                <Route
                  path="*"
                  element={<Navigate to="/citizen/dashboard" replace />}
                />
              </Routes>
            </CitizenLayout>
          </ProtectedRoute>
        }
      />

      {/* Public route - Official Login page */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginOfficial />
          </ProtectedRoute>
        }
      />

      {/* Always-available logout route */}
      <Route path="/logout" element={<Logout />} />

      {/* Catch all undefined routes and redirect to appropriate login */}
      <Route
        path="*"
        element={
          <ProtectedRoute requireAuth={false}>
            <Navigate to="/citizen/login" replace />
          </ProtectedRoute>
        }
      />

      {/* Protected routes - Official area */}
      <Route
        path="/official/*"
        element={
          <ProtectedRoute allowedRoles={["official"]}>
            <OfficialLayout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate to="/official/national-dashboard" replace />
                  }
                />
                <Route
                  path="/national-dashboard"
                  element={<NationalDashboard />}
                />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </OfficialLayout>
          </ProtectedRoute>
        }
      />
      </Routes>
    </Suspense>
  );
}

export default Routeee;
