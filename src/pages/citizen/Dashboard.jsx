import React, { useState, useEffect } from "react";
import {
  MapPin,
  Cloud,
  Sun,
  Thermometer,
  Wind,
  AlertCircle,
  Camera,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAQI } from "../../context/AQIContext";
import { useLanguage } from "../../context/LanguageContext";
import { getLocationWithAddress } from "../../utils/locationService";

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const { aqi, locationName, getAQIColor, getAQIStatus, refreshAQI, updateLocation } = useAQI();
  const { t } = useLanguage();

  // Dummy data for 24-hour graph
  const hourlyData = [
    { time: "00:00", value: 150 },
    { time: "03:00", value: 165 },
    { time: "06:00", value: 180 },
    { time: "09:00", value: 195 },
    { time: "12:00", value: 188 },
    { time: "15:00", value: 175 },
    { time: "18:00", value: 170 },
    { time: "21:00", value: 165 },
  ];

  // Dummy data for weekly graph
  const weeklyData = [
    { day: "Mon", value: 175 },
    { day: "Tue", value: 180 },
    { day: "Wed", value: 170 },
    { day: "Thu", value: 178 },
    { day: "Fri", value: 172 },
    { day: "Sat", value: 145 },
    { day: "Sun", value: 140 },
  ];

  // Load location on mount
  useEffect(() => {
    const loadLocation = async () => {
      // Only load if we don't have location already
      if (!locationName || locationName === "Unknown Location") {
        setIsLoadingLocation(true);
        setLocationError("");
        try {
          const locationData = await getLocationWithAddress();
          updateLocation(
            { latitude: locationData.latitude, longitude: locationData.longitude },
            locationData.address
          );
        } catch (error) {
          console.error("Location error:", error);
          setLocationError(error.message);
          // Set a default location if geolocation fails
          updateLocation(null, "Location unavailable");
        } finally {
          setIsLoadingLocation(false);
        }
      }
    };

    loadLocation();
  }, [locationName, updateLocation]);

  // Simple Line Chart Component
  const LineChart = ({ data, width = 100, height = 60 }) => {
    const maxValue = 200;
    const minValue = 0;
    const chartWidth = width - 40;
    const chartHeight = height - 20;
    const padding = 20;

    const points = data
      .map((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y =
          padding +
          chartHeight -
          ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="w-full h-full">
        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          points={points}
        />
        {data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y =
            padding +
            chartHeight -
            ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
          return <circle key={index} cx={x} cy={y} r="3" fill="#6366f1" />;
        })}
      </svg>
    );
  };

  // Simple Bar Chart Component
  const BarChart = ({ data, width = 100, height = 60 }) => {
    const maxValue = 200;
    const minValue = 0;
    const chartWidth = width - 40;
    const chartHeight = height - 20;
    const padding = 20;
    const barWidth = chartWidth / data.length - 4;

    return (
      <svg width={width} height={height} className="w-full h-full">
        {data.map((point, index) => {
          const x = padding + index * (chartWidth / data.length) + 2;
          const barHeight =
            ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
          const y = padding + chartHeight - barHeight;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#6366f1"
              rx="2"
            />
          );
        })}
      </svg>
    );
  };

  // Get alert message based on AQI
  const getAlertMessage = () => {
    if (aqi >= 201) {
      return t("dashboard.alertVeryUnhealthy");
    } else if (aqi >= 151) {
      return t("dashboard.alertUnhealthy");
    } else if (aqi >= 101) {
      return t("dashboard.alertSensitive");
    } else if (aqi >= 51) {
      return t("dashboard.alertModerate");
    }
    return t("dashboard.alertGood");
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* AQI Header Card */}
        <div
          className={`${getAQIColor()} text-white rounded-xl shadow-lg p-6 md:p-8`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {isLoadingLocation ? (
                <span className="text-lg font-medium">{t("dashboard.loadingLocation")}</span>
              ) : locationError ? (
                <span className="text-lg font-medium">{t("dashboard.locationUnavailable")}</span>
              ) : (
                <span className="text-lg font-medium">{locationName}</span>
              )}
            </div>
            <button
              onClick={refreshAQI}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={t("dashboard.refreshAQI")}
              aria-label={t("dashboard.refreshAQI")}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-4">
            <div className="text-6xl md:text-7xl font-bold mb-2">
              {aqi}
            </div>
            <div className="text-2xl md:text-3xl font-semibold">
              {getAQIStatus()}
            </div>
          </div>
          <div className={`${getAQIColor()} bg-opacity-50 rounded-lg p-4 flex items-start gap-3`}>
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm md:text-base">
              {getAlertMessage()}
            </p>
          </div>
        </div>

        {/* Key Pollutants Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t("dashboard.keyPollutants")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* PM2.5 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">PM2.5</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-xs text-gray-500">µg/m³</div>
            </div>

            {/* NO2 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">NO2</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-xs text-gray-500">ppb</div>
            </div>

            {/* Temperature */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Temperature
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">18</div>
              <div className="text-xs text-gray-500">°C</div>
            </div>

            {/* Wind Speed */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Wind Speed
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-xs text-gray-500">km/h</div>
            </div>
          </div>
        </div>

        {/* Past 24 Hours Graph */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t("dashboard.past24Hours")}
          </h2>
          <div className="h-64 md:h-80 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-8 h-full pb-8 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Line chart */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  points={hourlyData
                    .map((point, index) => {
                      const x = (index / (hourlyData.length - 1)) * 100;
                      const y = 100 - (point.value / 200) * 100;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
                {hourlyData.map((point, index) => {
                  const x = (index / (hourlyData.length - 1)) * 100;
                  const y = 100 - (point.value / 200) * 100;
                  return (
                    <circle key={index} cx={x} cy={y} r="0.8" fill="#6366f1" />
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
                {hourlyData.map((point, index) => (
                  <span key={index}>{point.time}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Graph */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("dashboard.weeklyTrend")}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod("Week")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === "Week"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("dashboard.week")}
              </button>
              <button
                onClick={() => setSelectedPeriod("Month")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === "Month"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("dashboard.month")}
              </button>
            </div>
          </div>
          <div className="h-64 md:h-80 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-8 h-full pb-8 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Bar chart */}
              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {weeklyData.map((point, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-indigo-500 rounded-t"
                    style={{
                      height: `${(point.value / 200) * 100}%`,
                      minHeight: "4px",
                    }}
                  ></div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
                {weeklyData.map((point, index) => (
                  <span key={index} className="font-semibold">
                    {point.day}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            AQI improved on Sunday, weekdays show higher pollution.
          </p>
        </div>

        {/* Grid Layout for Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Insight Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("dashboard.monthlyInsight")}
            </h3>
            <p className="text-gray-700">
              {t("dashboard.averageAQI")}:{" "}
              <span className="font-bold text-red-600">162 ({t("dashboard.unhealthy")})</span>.
            </p>
            <p className="text-gray-700 mt-2">
              {t("dashboard.weekendBetter")}{" "}
              <span className="font-bold text-green-600">18% better</span>.
            </p>
          </div>

          {/* Report Smog Button Card */}
          <div className="bg-green-600 rounded-xl shadow-md p-6 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6" />
                <p className="text-base md:text-lg font-medium">
                  {t("dashboard.seeHeavySmog")}
                </p>
              </div>
              <Link
                to="/citizen/report"
                className="bg-white text-green-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                {t("dashboard.reportNow")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
