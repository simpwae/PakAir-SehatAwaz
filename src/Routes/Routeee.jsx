import { Routes, Route, Navigate } from "react-router-dom";
import NationalDashboard from "../pages/NationalDashboard";
import NavigationSidebar from "../components/NavigationSidebar";
import TopNavigationBar from "../components/TopNavigationBar";
import { useState } from "react";

function Routeee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled] = useState(false);
  return (
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
        </Routes>
      </main>
    </div>
  );
}

export default Routeee;
