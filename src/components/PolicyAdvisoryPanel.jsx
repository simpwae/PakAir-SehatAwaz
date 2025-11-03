import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { advisoryAlerts } from "../data/advisoryAlerts";
import AlertCard from "./AlertCard";

export default function PolicyAdvisoryPanel() {
  const [selectedCity, setSelectedCity] = useState("KPK");
  const [selectedArea, setSelectedArea] = useState("Peshawar");
  const [selectedTime, setSelectedTime] = useState("Current");

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
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
        </button>
      </div>

      <div className="space-y-4">
        {advisoryAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
