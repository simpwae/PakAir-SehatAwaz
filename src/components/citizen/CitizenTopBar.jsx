import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, ChevronDown, Menu, X, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../ui/Button";

export default function CitizenTopBar({ sidebarOpen, setSidebarOpen, isScrolled }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/citizen/login");
    setDropdownOpen(false);
  };

  return (
    <header
      className={`bg-white fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-gray-200"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 lg:ml-72">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button and title */}
          <div className="flex items-center">
            <CustomButton
              variant="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </CustomButton>
            <div className="flex items-center ml-2 lg:ml-0 lg:hidden">
              <h1 className="text-lg font-medium text-gray-900">PakAir</h1>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <CustomButton variant="icon">
              <Bell className="w-5 h-5" />
            </CustomButton>
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <CustomButton
                variant="icon"
                className="flex items-center gap-1"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="w-5 h-5" />
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </CustomButton>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => {
                      navigate("/citizen/settings");
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

