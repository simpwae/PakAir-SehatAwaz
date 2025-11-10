import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, MapPin, FileText, Heart, Map, Settings, ChevronLeft, Languages } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function CitizenSidebar({ isOpen, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();

  const navigationItems = [
    { icon: LayoutDashboard, label: t("nav.dashboard"), path: "/citizen/dashboard" },
    { icon: MapPin, label: t("nav.report"), path: "/citizen/report" },
    { icon: Heart, label: t("nav.health"), path: "/citizen/health" },
    { icon: Map, label: t("nav.map"), path: "/citizen/map" },
    { icon: Settings, label: t("nav.settings"), path: "/citizen/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/citizen/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-full lg:w-72 bg-gray-900 flex flex-col px-0 lg:px-6 py-4 text-white shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 z-50`}
    >
      {/* Brand Logo */}
      <div className="flex items-center justify-between mb-8 px-6">
        <div className="flex items-center">
          <div className="bg-white/20 rounded-md p-1.5 mr-2">
            <span className="font-bold text-sm">PA</span>
          </div>
          <h1 className="text-xl font-semibold text-white">PakAir</h1>
        </div>
        {/* Back button - only visible on small screens */}
        <button
          onClick={() => setOpen && setOpen(false)}
          className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Close sidebar"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-0 px-6 lg:px-0">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex w-full gap-3 items-center rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-white/20 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setOpen && setOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-2">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Language Toggle */}
      <div className="mt-auto px-6 lg:px-0 mb-4">
        <button
          onClick={toggleLanguage}
          className="flex w-full gap-3 items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Toggle language"
        >
          <Languages className="w-5 h-5" />
          <span className="ml-2">{language === 'en' ? 'اردو' : 'English'}</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="px-6 lg:px-0 p-4">
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-xs text-gray-300">
            Contact our support team for assistance with air quality monitoring
            and reporting.
          </p>
        </div>
      </div>
    </aside>
  );
}

