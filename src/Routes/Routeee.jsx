import { Routes, Route, Navigate } from "react-router-dom";
import NationalDashboard from "../pages/official/NationalDashboard";
import SettingsPage from "../pages/official/SettingsPage";
import LoginOfficial from "../pages/official/LoginOfficial";
import LoginPage from "../pages/citizen/LoginPage";
import SignupPage from "../pages/citizen/SignupPage";
import Dashboard from "../pages/citizen/Dashboard";
import NavigationSidebar from "../components/NavigationSidebar";
import TopNavigationBar from "../components/TopNavigationBar";
import CitizenLayout from "../layouts/CitizenLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";

function Routeee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled] = useState(false);

  return (
    <Routes>
      {/* Public routes - Citizen pages */}
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
        path="/citizen/dashboard"
        element={
          <ProtectedRoute requireAuth={false}>
            <CitizenLayout>
              <Dashboard />
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
      
      {/* Default route - redirect to official login if not authenticated */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      
      {/* Protected routes - Dashboard */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <TopNavigationBar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isScrolled={isScrolled}
              />
              <NavigationSidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

              {/* Mobile Overlay */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Main content */}
              <main className="lg:ml-72 pt-16">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/national-dashboard" replace />}
                  />
                  <Route path="/national-dashboard" element={<NationalDashboard />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routeee;
