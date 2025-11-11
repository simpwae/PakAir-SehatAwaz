import { useState, useEffect, useCallback, memo } from "react";
import { ChevronDown, AlertCircle, RefreshCw } from "lucide-react";
import axios from "axios";

function PolicyAdvisory() {
  const [selectedCity, setSelectedCity] = useState("KPK");
  const [selectedArea, setSelectedArea] = useState("Peshawar");
  const [selectedTime, setSelectedTime] = useState("Current");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

      const response = await axios.get(`${API_BASE_URL}/recommendations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setRecommendations(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(
        err.response?.data?.message || "Failed to fetch recommendations"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

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

      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Policy Recommendations
        </h2>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recommendations...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Recommendations List */}
      {!loading && !error && (
        <div className="space-y-4">
          {recommendations.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">No recommendations found.</p>
            </div>
          ) : (
            recommendations.map((rec, index) => (
              <div
                key={rec._id || index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Display all fields dynamically */}
                  {Object.entries(rec).map(([key, value]) => {
                    // Skip _id field
                    if (key === "_id") return null;

                    return (
                      <div
                        key={key}
                        className="border-b border-gray-100 pb-3 last:border-0"
                      >
                        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">
                          {key.replace(/_/g, " ")}
                        </h3>
                        <p className="text-gray-800">
                          {typeof value === "object" && value !== null
                            ? JSON.stringify(value, null, 2)
                            : String(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default memo(PolicyAdvisory);
