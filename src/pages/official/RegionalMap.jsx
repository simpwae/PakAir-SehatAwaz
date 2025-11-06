import PageHeader from "../../components/PageHeader";

export default function RegionalMap() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader mainTabs={[]} />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="flex-1 bg-white rounded-lg shadow border">
          <div className="p-4 border-b flex flex-wrap gap-3 items-center">
            <select className="px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <option>All Pakistan</option>
              <option>Punjab</option>
              <option>Sindh</option>
              <option>KPK</option>
              <option>Balochistan</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <option>All Cities</option>
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

          <div className="relative w-full h-[520px]">
            <iframe
              title="RegionalMap"
              src="https://www.openstreetmap.org/export/embed.html?bbox=60.0%2C22.0%2C78.0%2C38.0&layer=mapnik"
              className="w-full h-full border-0"
            />

            <div className="absolute right-4 bottom-4 bg-white/90 rounded-md p-3 text-xs shadow">
              <div className="font-semibold mb-2">AQI Levels</div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"/> Good (0-50)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"/> Moderate (51-100)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"/> Unhealthy-SG (101-150)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"/> Unhealthy (151-200)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-600"/> Very Unhealthy (201-300)</li>
              </ul>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow border p-4">
            <h3 className="text-sm font-semibold mb-3">My Saved Locations</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 border">
                <span>Lahore</span>
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
