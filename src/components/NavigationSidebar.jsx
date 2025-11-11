import {
  Globe,
  Settings as SettingsIcon,
  ChevronLeft,
  HeartPulse,
  Map as MapIcon,
  CloudFog,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import CustomButton from "./ui/Button";

const navigationItems = [
  {
    icon: Globe,
    label: "National Dashboard",
    path: "/official/national-dashboard",
  },
  {
    icon: Database,
    label: "Model Data",
    path: "/official/model-data",
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    path: "/official/settings",
  },
];

export default function NavigationSidebar({ isOpen, setOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-full lg:w-72 bg-green-700 flex flex-col px-0 lg:px-6 py-4 text-white shadow-xl transition-transform duration-300 ease-in-out ${
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
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex w-full gap-3 items-center rounded-md px-3 py-2 text-sm hover:bg-white/10"
            onClick={() => setOpen && setOpen(false)}
          >
            <item.icon className="w-5 h-5 text-white" />
            <span className="ml-2">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Help Section */}
      <div className="mt-auto px-6 lg:px-0 p-4">
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
