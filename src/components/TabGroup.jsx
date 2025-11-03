export default function TabGroup({ tabs, activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab.toLowerCase().replace(" ", ""))}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab.toLowerCase().replace(" ", "")
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
