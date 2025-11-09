import { Routes, Route, Navigate } from "react-router-dom";
import NationalDashboard from "../pages/official/NationalDashboard";
import SettingsPage from "../pages/official/SettingsPage";
import LoginOfficial from "../pages/official/LoginOfficial";
import LoginPage from "../pages/citizen/LoginPage";
import SignupPage from "../pages/citizen/SignupPage";
import Dashboard from "../pages/citizen/Dashboard";
import CitizenHealthGuidance from "../pages/citizen/HealthGuidance";
import CitizenRegionalMap from "../pages/citizen/RegionalMap";
import CitizenReportSmog from "../pages/citizen/ReportSmog";
import CitizenSettings from "../pages/citizen/Settings";
import NavigationSidebar from "../components/NavigationSidebar";
import TopNavigationBar from "../components/TopNavigationBar";
import CitizenLayout from "../layouts/CitizenLayout";
import OfficialLayout from "../layouts/OfficialLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";
import Logout from "../pages/Logout";

function Routeee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled] = useState(false);

  return (
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
  );
}

export default Routeee;
