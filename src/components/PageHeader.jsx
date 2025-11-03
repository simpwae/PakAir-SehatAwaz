import { Link, useLocation } from "react-router-dom";
import FilterBar from "./FilterBar";

// PageHeader now supports an optional Policy Advisory tab that is only shown
// when `showPolicyAdvisory` is true. If shown, clicking it calls `onPolicyClick`.
export default function PageHeader({
  mainTabs = [
    { key: "live-map", label: "Live Map & Stats", to: "/live-map" },
    {
      key: "citizen-reports",
      label: "Citizen Reports",
      to: "/citizen-reports",
    },
  ],
  showPolicyAdvisory = false,
  onPolicyClick,
  advisoryOpen = false,
  // controlled mode
  activeTab,
  onTabSelect,
}) {
  const location = useLocation();

  const renderTab = (tab) => {
    if (onTabSelect) {
      const isActive = activeTab === tab.key;
      return (
        <button
          key={tab.key}
          onClick={() => onTabSelect(tab.key)}
          className={`pb-3 px-1 text-sm font-medium border-b-2 ${
            isActive
              ? "border-green-600 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      );
    }

    // uncontrolled / link mode
    const isActive = location.pathname === tab.to;
    return (
      <Link
        key={tab.key}
        to={tab.to}
        className={`pb-3 px-1 text-sm font-medium border-b-2 ${
          isActive
            ? "border-green-600 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        {tab.label}
      </Link>
    );
  };

  return (
    <div>
      <FilterBar />

      {/* Main navigation tabs centered */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-8 items-end">
          {mainTabs.map(renderTab)}

          {showPolicyAdvisory && (
            <button
              onClick={() => onPolicyClick && onPolicyClick()}
              className={`pb-3 px-1 text-sm font-medium border-b-2 ${
                advisoryOpen
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Policy Advisory
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
