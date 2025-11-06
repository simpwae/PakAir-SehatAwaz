export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">My Profile & Settings</h1>

      <div className="space-y-4">
        <section className="bg-white border rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Full name" />
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Email" />
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Phone" />
          </div>
        </section>

        <section className="bg-white border rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">Language Preferences</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-md text-sm bg-green-600 text-white">English</button>
            <button className="px-3 py-2 rounded-md text-sm bg-white border">Urdu</button>
          </div>
        </section>

        <section className="bg-white border rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">Alert Preferences</h2>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> PM2.5 Notifications</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Dust Alerts</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Rain Alerts</label>
          </div>
        </section>

        <section className="bg-white border rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">Saved Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="p-3 border rounded-md bg-gray-50 text-left">Home\n<div className="text-xs text-gray-500">AQI 102</div></button>
            <button className="p-3 border rounded-md bg-gray-50 text-left">Work\n<div className="text-xs text-gray-500">AQI 78</div></button>
            <button className="p-3 border rounded-md bg-white text-left">+ Add Location</button>
          </div>
        </section>
      </div>
    </div>
  );
}
