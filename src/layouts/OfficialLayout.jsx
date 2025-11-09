import { useState } from "react";
import { Navigate } from "react-router-dom";
import TopNavigationBar from "../components/TopNavigationBar";
import NavigationSidebar from "../components/NavigationSidebar";
import { useAuth } from "../context/AuthContext";

export default function OfficialLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Protect official layout - redirect non-officials back to citizen login
  if (!isAuthenticated || user?.role !== "official") {
    return <Navigate to="/citizen/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isScrolled={isScrolled}
      />
      <NavigationSidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-72 pt-16">{children}</main>
    </div>
  );
}
