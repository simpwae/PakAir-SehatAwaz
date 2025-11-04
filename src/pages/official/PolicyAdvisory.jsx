import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { advisoryAlerts } from "../../data/advisoryAlerts";
import AlertCard from "../../components/AlertCard";

export default function PolicyAdvisory() {
  const [selectedCity, setSelectedCity] = useState("KPK");
  const [selectedArea, setSelectedArea] = useState("Peshawar");
  const [selectedTime, setSelectedTime] = useState("Current");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="KPK">KPK</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="Peshawar">Peshawar</option>
            <option value="Mardan">Mardan</option>
            <option value="Swat">Swat</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="Current">Current</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 flex items-center gap-2">
          <span>Today</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex flex-wrap gap-8">
          <button className="pb-3 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Live Map & Stats
          </button>
          <button className="pb-3 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Citizen Reports
          </button>
          <button className="pb-3 px-1 text-sm font-medium border-b-2 border-green-600 text-green-600">
            Policy Advisory
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div>
        {advisoryAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

