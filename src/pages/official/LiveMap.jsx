import PageHeader from "../../components/PageHeader";

export default function LiveMap() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader />

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
            <p className="text-sm text-gray-500">
              Interactive map powered by OpenStreetMap (embed).
            </p>
          </div>

          <div className="w-full h-[480px]">
            {/* OpenStreetMap embed - no external packages required */}
            <iframe
              title="OpenStreetMap"
              src="https://www.openstreetmap.org/export/embed.html?bbox=68.5%2C23.5%2C77.5%2C36.5&layer=mapnik"
              className="w-full h-full border-0"
            />
            <div className="p-3 text-xs text-gray-500">
              Map data © OpenStreetMap contributors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

