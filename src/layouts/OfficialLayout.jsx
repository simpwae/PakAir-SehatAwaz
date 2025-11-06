import { useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import NavigationSidebar from "../components/NavigationSidebar";

export default function OfficialLayout({ children }) {
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
