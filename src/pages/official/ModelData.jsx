import { useEffect, useState, useCallback, memo } from "react";
import {
  Database,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import axios from "axios";

function ModelData() {
  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchModelData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

      const response = await axios.get(`${API_BASE_URL}/model-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setModelData(response.data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Error fetching model data:", err);
      setError(err.response?.data?.message || "Failed to fetch model data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModelData();
  }, [fetchModelData]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" />
              Model Data
            </h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              View and analyze air quality model predictions
            </p>
          </div>
          <button
            onClick={fetchModelData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Last Updated Info */}
        {lastUpdated && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">
                {modelData.length}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <Database className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <p className="text-lg font-semibold text-gray-900">model_data</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Loading model data...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-red-900">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Data Display */}
      {!loading && !error && modelData.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No model data found</p>
        </div>
      )}

      {!loading && !error && modelData.length > 0 && (
        <div className="space-y-4">
          {/* Mobile View - Cards */}
          <div className="block lg:hidden space-y-4">
            {modelData.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-green-600">
                    Entry #{index + 1}
                  </span>
                  {item._id && (
                    <span className="text-xs text-gray-500">
                      ID: {String(item._id).slice(-8)}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {Object.entries(item).map(([key, value]) => {
                    if (key === "_id") return null;
                    return (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-sm text-gray-900 mt-1 break-all">
                          {renderValue(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  {modelData.length > 0 &&
                    Object.keys(modelData[0])
                      .filter((key) => key !== "_id")
                      .map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key.replace(/_/g, " ")}
                        </th>
                      ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modelData.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {index + 1}
                    </td>
                    {Object.entries(item).map(([key, value]) => {
                      if (key === "_id") return null;
                      return (
                        <td
                          key={key}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          <div
                            className="max-w-xs truncate"
                            title={renderValue(value)}
                          >
                            {renderValue(value)}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {item._id ? String(item._id).slice(-8) : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ModelData);
