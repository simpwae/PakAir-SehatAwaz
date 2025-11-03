import { Search, Bell, User, ChevronDown, Menu, X } from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen, isScrolled }) {
  return (
    <header
      className={`bg-white fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-gray-200"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 lg:ml-72">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center ml-2 lg:ml-0 lg:hidden">
              <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
              
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="hidden sm:flex items-center px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors">
              English <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            <button
              className="relative p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
