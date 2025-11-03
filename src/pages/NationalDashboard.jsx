import PageHeader from "../components/PageHeader";
import PolicyAdvisoryPanel from "../components/PolicyAdvisoryPanel";
import CitizenReports from "./CitizenReports";
import LiveMap from "./LiveMap";
import { useState } from "react";

export default function NationalDashboard() {
  // local tab state controls which content is visible inside the dashboard
  const [activeTab, setActiveTab] = useState("citizen-reports");

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* Show PageHeader and enable Policy Advisory tab only on this page */}
      <PageHeader
        showPolicyAdvisory={true}
        onPolicyClick={() => setActiveTab("policy-advisory")}
        activeTab={activeTab}
        onTabSelect={(key) => setActiveTab(key)}
        mainTabs={[
          { key: "live-map", label: "Live Map & Stats" },
          { key: "citizen-reports", label: "Citizen Reports" },
        ]}
        advisoryOpen={activeTab === "policy-advisory"}
      />

      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">National Dashboard</h2>
        <p className="text-sm text-gray-600">
          Overview cards and maps go here.
        </p>
      </div>

      {/* Tab content: only one of these shows at a time */}
      <div className="mt-8">
        {activeTab === "live-map" && (
          <div>
            <LiveMap />
          </div>
        )}

        {activeTab === "citizen-reports" && (
          <div>
            <CitizenReports showHeader={false} />
          </div>
        )}

        {activeTab === "policy-advisory" && (
          <div>
            <PolicyAdvisoryPanel />
          </div>
        )}
      </div>
    </div>
  );
}
