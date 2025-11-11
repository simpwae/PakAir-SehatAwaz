import { useState, useEffect, useCallback, memo } from "react";
import PageHeader from "../../components/PageHeader";
import ReportCard from "../../components/ReportCard";
import Pagination from "../../components/Pagination";
import CustomButton from "../../components/ui/Button";
import { reportsAPI } from "../../utils/api";
import { CheckCircle, XCircle, AlertCircle, Trash2 } from "lucide-react";

function CitizenReports({ showHeader = true }) {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [verifyingId, setVerifyingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // 'verify', 'reject', or 'delete'
  const [successMessage, setSuccessMessage] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = {
        page: currentPage,
        limit: 20,
      };

      if (activeTab === "Verified") {
        params.verified = "true";
      } else if (activeTab === "Unverified") {
        params.verified = "false";
      }

      const response = await reportsAPI.getReports(params);
      if (response.success) {
        setReports(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError("Failed to load reports");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load reports"
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, currentPage]);

  // Fetch reports from API
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Handle verification
  const handleVerify = async (reportId) => {
    setVerifyingId(reportId);
    try {
      const response = await reportsAPI.verifyReport(reportId);
      if (response.success) {
        setSuccessMessage("Report verified successfully!");
        // Refresh reports to get updated data
        await fetchReports();
        setShowConfirmModal(false);
        setSelectedReport(null);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.message || "Failed to verify report");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to verify report"
      );
    } finally {
      setVerifyingId(null);
    }
  };

  // Handle reject
  const handleReject = async (reportId) => {
    setVerifyingId(reportId);
    try {
      const response = await reportsAPI.rejectReport(reportId);
      if (response.success) {
        setSuccessMessage("Report rejected.");
        // Refresh reports to get updated data
        await fetchReports();
        setShowConfirmModal(false);
        setSelectedReport(null);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.message || "Failed to reject report");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to reject report"
      );
    } finally {
      setVerifyingId(null);
    }
  };

  // Handle delete
  const handleDelete = async (reportId) => {
    setVerifyingId(reportId);
    try {
      const response = await reportsAPI.deleteReport(reportId);
      if (response.success) {
        setSuccessMessage("Report deleted successfully.");
        // Refresh reports to get updated data
        await fetchReports();
        setShowConfirmModal(false);
        setSelectedReport(null);
        setConfirmAction(null);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.message || "Failed to delete report");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to delete report"
      );
    } finally {
      setVerifyingId(null);
    }
  };

  // Open confirmation modal
  const openConfirmModal = (report, action) => {
    setSelectedReport(report);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  // Transform API report to match ReportCard format
  const transformReport = (report) => {
    return {
      id: report._id,
      img: report.media?.url || "",
      title: report.title || report.description || "Air Quality Report",
      location:
        report.location?.address ||
        `${report.location?.city || ""} ${
          report.location?.province || ""
        }`.trim() ||
        `${report.location?.coordinates?.latitude}, ${report.location?.coordinates?.longitude}`,
      time: report.createdAt
        ? new Date(report.createdAt).toLocaleDateString()
        : "Recently",
      verified: report.verified || false,
      status: report.status,
      _raw: report, // Keep original data for verification
    };
  };

  const filteredReports = reports.map(transformReport);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {showHeader && <PageHeader />}

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Report Type Tabs */}
      <div className="flex gap-2 mb-6">
        {["All Reports", "Verified", "Unverified"].map((tab) => (
          <CustomButton
            key={tab}
            variant={tab === activeTab ? "primary" : "default"}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            {tab}
          </CustomButton>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-600">Loading reports...</p>
        </div>
      )}

      {/* Report Grid */}
      {!isLoading && (
        <>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No reports found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredReports.map((report) => (
                <div key={report.id} className="relative">
                  <ReportCard report={report} />

                  {/* Verify/Reject buttons for pending reports */}
                  {!report.verified && report.status === "pending" && (
                    <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                      <button
                        onClick={() => openConfirmModal(report._raw, "verify")}
                        disabled={verifyingId === report.id}
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {verifyingId === report.id ? "Verifying..." : "Verify"}
                      </button>
                      <button
                        onClick={() => openConfirmModal(report._raw, "reject")}
                        disabled={verifyingId === report.id}
                        className="flex-1 px-3 py-2 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}

                  {/* Delete button for rejected reports */}
                  {report.status === "rejected" && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <button
                        onClick={() => openConfirmModal(report._raw, "delete")}
                        disabled={verifyingId === report.id}
                        className="w-full px-3 py-2 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        {verifyingId === report.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedReport && confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {confirmAction === "verify" && "Verify Report"}
              {confirmAction === "reject" && "Reject Report"}
              {confirmAction === "delete" && "Delete Report"}
            </h3>
            <p className="text-gray-600 mb-6">
              {confirmAction === "verify" && (
                <>
                  Are you sure you want to verify this report?
                  <span className="block mt-2 text-sm text-green-600">
                    This will mark the report as verified and make it visible to
                    all users.
                  </span>
                </>
              )}
              {confirmAction === "reject" && (
                <>
                  Are you sure you want to reject this report?
                  <span className="block mt-2 text-sm text-red-600">
                    This will mark the report as rejected.
                  </span>
                </>
              )}
              {confirmAction === "delete" && (
                <>
                  Are you sure you want to permanently delete this report?
                  <span className="block mt-2 text-sm text-red-600 font-semibold">
                    This action cannot be undone!
                  </span>
                </>
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedReport(null);
                  setConfirmAction(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const reportId = selectedReport._id || selectedReport.id;
                  if (confirmAction === "verify") {
                    handleVerify(reportId);
                  } else if (confirmAction === "reject") {
                    handleReject(reportId);
                  } else if (confirmAction === "delete") {
                    handleDelete(reportId);
                  }
                }}
                disabled={
                  verifyingId === (selectedReport._id || selectedReport.id)
                }
                className={`px-4 py-2 rounded-md text-white ${
                  confirmAction === "verify"
                    ? "bg-green-600 hover:bg-green-700"
                    : confirmAction === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-800 hover:bg-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {verifyingId === (selectedReport._id || selectedReport.id)
                  ? "Processing..."
                  : confirmAction === "verify"
                  ? "Verify"
                  : confirmAction === "reject"
                  ? "Reject"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && pagination.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default memo(CitizenReports);
