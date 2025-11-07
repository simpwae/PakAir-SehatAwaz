import { useEffect, useState } from "react";
import MapWithSites from "../../components/MapWithSites";
import { geocodeUniversities } from "../../utils/geocode";

export default function RegionalMap() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Peshawar");
  const mapRef = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = new URL("../../data/temp_mapSitesData.json", import.meta.url);
        const res = await fetch(url);
        const data = await res.json().catch(() => []);
        const raw = Array.isArray(data) ? data : [];
        const fixed = await geocodeUniversities(raw);
        // Keep only Peshawar entries (Campus or text match)
        const pesh = fixed.filter((s) => {
          const campus = (s.Campus || s.campus || s.city || "").toString().toLowerCase();
          const uni = (s.University || s.name || "").toString().toLowerCase();
          return campus.includes("peshawar") || uni.includes("peshawar");
        });
        setSites(pesh);
      } catch {
        const fallback = [
          { id: 1, name: "Peshawar #1", lat: 34.0151, lon: 71.5249, aqi: 132 },
          { id: 2, name: "Peshawar #2", lat: 34.0051, lon: 71.5149, aqi: 88 },
          { id: 3, name: "Peshawar #3", lat: 34.0251, lon: 71.5349, aqi: 160 },
        ];
        setSites(fallback);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Regional Map</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow border">
          <div className="p-4 border-b flex flex-wrap gap-3 items-center">
            <select className="px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <option>All Pakistan</option>
              <option>Punjab</option>
              <option>Sindh</option>
              <option>KPK</option>
              <option>Balochistan</option>
            </select>
            <select
              className="px-3 py-2 bg-gray-50 border rounded-md text-sm"
              value={city}
              onChange={(e) => {
                const val = e.target.value;
                setCity(val);
                if (val === "Peshawar" && mapRef[0]) {
                  try { mapRef[0].flyTo([34.0151, 71.5249], 12, { duration: 0.6 }); } catch {}
                }
              }}
            >
              <option>Peshawar</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <option>All Pollutants</option>
              <option>PM2.5</option>
              <option>PM10</option>
              <option>NO2</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <option>Live</option>
              <option>Last 24h</option>
              <option>Last 7d</option>
            </select>
          </div>

          <div className="relative w-full">
            {loading ? (
              <div className="h-[520px] flex items-center justify-center text-sm text-gray-500">Loading map…</div>
            ) : (
              <MapWithSites
                sites={sites}
                height={520}
                initialCenter={[34.0151, 71.5249]}
                initialZoom={12}
                onMapReady={(m) => { mapRef[0] = m; }}
              />
            )}
          </div>
        </div>

        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow border p-4">
            <h3 className="text-sm font-semibold mb-3">My Saved Locations</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 border">
                <span>Home</span>
                <span className="inline-flex items-center gap-1 text-red-500 text-xs">AQI 198</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 border">
                <span>Work</span>
                <span className="inline-flex items-center gap-1 text-yellow-600 text-xs">AQI 92</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 border">
                <span>Karachi</span>
                <span className="inline-flex items-center gap-1 text-green-600 text-xs">AQI 44</span>
              </button>
              <button className="w-full px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-gray-600">
                + Add location
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
