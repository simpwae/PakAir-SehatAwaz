import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CitizenSidebar from "../components/citizen/CitizenSidebar";
import CitizenTopBar from "../components/citizen/CitizenTopBar";

export default function CitizenLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled] = useState(false);

  // Check if user is authenticated and has citizen role
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || user?.role !== "citizen") {
    return <Navigate to="/citizen/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CitizenTopBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isScrolled={isScrolled}
      />
      <CitizenSidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-72 pt-16">{children}</main>
    </div>
  );
}
