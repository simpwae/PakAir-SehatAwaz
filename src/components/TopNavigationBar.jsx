import { Search, Bell, User, ChevronDown, Menu, X } from "lucide-react";
import CustomButton from "./ui/Button";

export default function TopNavigationBar({
  sidebarOpen,
  setSidebarOpen,
  isScrolled,
}) {
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
              <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl ml-8 hidden lg:block">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <CustomButton variant="icon">
              <Bell className="w-5 h-5" />
            </CustomButton>
            <CustomButton variant="icon" className="flex items-center gap-1">
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </CustomButton>
          </div>
        </div>
      </div>
    </header>
  );
}
