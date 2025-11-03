import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ReportCard from "../components/ReportCard";
import Pagination from "../components/Pagination";
import CustomButton from "../components/ui/Button";
import reports from "../data/reports";

export default function CitizenReports({ showHeader = true }) {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [currentPage] = useState(1);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {showHeader && <PageHeader />}

      {/* Report Type Tabs */}
      <div className="flex gap-2 mb-6">
        {["All Reports", "Verified", "Unverified"].map((tab) => (
          <CustomButton
            key={tab}
            variant={tab === activeTab ? "primary" : "default"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </CustomButton>
        ))}
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={3} />
    </div>
  );
}
