import { useEffect, useState } from "react";
import MapWithSites from "../../components/MapWithSites";
import { geocodeUniversities } from "../../utils/geocode";

export default function LiveMap() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const url = new URL("../../data/temp_mapSitesData.json", import.meta.url);
        const res = await fetch(url);
        const data = await res.json().catch(() => []);
        const raw = Array.isArray(data) ? data : [];
        const fixed = await geocodeUniversities(raw);
        setSites(fixed);
      } catch {
        // Fallback demo markers across Pakistan
        const fallback = [
          { id: 1, name: "Lahore", lat: 31.5204, lon: 74.3587, aqi: 195 },
          { id: 2, name: "Karachi", lat: 24.8607, lon: 67.0011, aqi: 88 },
          { id: 3, name: "Islamabad", lat: 33.6844, lon: 73.0479, aqi: 60 },
          { id: 4, name: "Quetta", lat: 30.1798, lon: 66.975, aqi: 42 },
          { id: 5, name: "Peshawar", lat: 34.0151, lon: 71.5249, aqi: 132 },
        ];
        setSites(fallback);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats cards */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">Air Quality Index</h3>
            <div className="text-3xl font-bold text-green-600">72</div>
            <p className="text-xs text-gray-400">Updated 2 mins ago</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">PM2.5</h3>
            <div className="text-2xl font-semibold text-indigo-600">
              18 µg/m³
            </div>
            <p className="text-xs text-gray-400">Sensor network average</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">PM10</h3>
            <div className="text-2xl font-semibold text-indigo-600">
              42 µg/m³
            </div>
            <p className="text-xs text-gray-400">Sensor network average</p>
          </div>
        </div>

        {/* Map area */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Live Map</h2>
            <p className="text-sm text-gray-500">Colored markers by AQI from data/temp_mapSitesData.json</p>
          </div>
          <div className="w-full">
            {loading ? (
              <div className="h-[480px] flex items-center justify-center text-sm text-gray-500">Loading map…</div>
            ) : (
              <MapWithSites sites={sites} height={480} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

