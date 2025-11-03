import { Globe, MapPin, Bell, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-72 bg-green-700 flex flex-col px-6 py-4 text-white shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 z-50`}
    >
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <div className="bg-white/20 rounded-md p-1.5 mr-2">
          <span className="font-bold text-sm">PA</span>
        </div>
        <h1 className="text-xl font-semibold text-white">PakAir</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/national-dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/national-dashboard"
              ? "bg-white/20 text-white font-semibold"
              : "text-gray-100 hover:bg-white/10"
          }`}
        >
          <Globe
            className={`w-5 h-5 ${
              location.pathname === "/national-dashboard"
                ? "text-white"
                : "text-gray-200"
            }`}
          />
          <span className="font-medium">National Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/citizen-reports")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/citizen-reports"
              ? "bg-white/20 text-white font-semibold"
              : "text-gray-100 hover:bg-white/10"
          }`}
        >
          <MapPin
            className={`w-5 h-5 ${
              location.pathname === "/citizen-reports"
                ? "text-white"
                : "text-gray-200"
            }`}
          />
          <span className="font-medium">Citizen Reports</span>
        </button>

        <button
          onClick={() => navigate("/national-dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/national-dashboard"
              ? "bg-white/20 text-white font-semibold"
              : "text-gray-100 hover:bg-white/10"
          }`}
        >
          <Bell
            className={`w-5 h-5 ${
              location.pathname === "/national-dashboard"
                ? "text-white"
                : "text-gray-200"
            }`}
          />
          <span className="font-medium">Policy Advisory</span>
        </button>

        <button
          onClick={() => navigate("/settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/settings"
              ? "bg-white/20 text-white font-semibold"
              : "text-gray-100 hover:bg-white/10"
          }`}
        >
          <User
            className={`w-5 h-5 ${
              location.pathname === "/settings" ? "text-white" : "text-gray-200"
            }`}
          />
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      {/* Help section */}
      <div className="mt-auto p-4">
        <div className="bg-green-800 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-xs text-gray-200">
            Contact our support team for assistance with air quality monitoring
            and reporting.
          </p>
        </div>
      </div>
    </aside>
  );
}
