import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import RadiologyFilters from "../components/radiology-management/RadiologyFilters";
import RadiologyTable from "../components/radiology-management/RadiologyTable";
import RadiologyFormModal from "../components/radiology-management/RadiologyFormModal";
import RadiologyReportModal from "../components/radiology-management/RadiologyReportModal";
import { initialRadiologyRequests } from "../data/radiologyManagementData";

export default function RadiologyManagement() {
  const [requests, setRequests] = useState(initialRadiologyRequests);
  const [search, setSearch] = useState("");
  const [testType, setTestType] = useState("");
  const [status, setStatus] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !search ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = !testType || r.testType === testType;
    const matchesStatus = !status || r.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSave = (req) => setRequests((prev) => [...prev, req]);

  const handleUploadReport = (req, fileName, findings) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === req.id ? { ...r, status: "Report Ready", reportFileName: fileName, findings } : r
      )
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Radiology Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Radiology</p>
          </div>

          <RadiologyFilters
            search={search} onSearchChange={setSearch}
            testType={testType} onTestTypeChange={setTestType}
            status={status} onStatusChange={setStatus}
            onNewRequest={() => setFormOpen(true)}
          />

          <RadiologyTable
            requests={filtered}
            onUploadReport={setReportTarget}
            onViewReport={setReportTarget}
          />
        </main>
      </div>

      {formOpen && (
        <RadiologyFormModal existingRequests={requests} onClose={() => setFormOpen(false)} onSave={handleSave} />
      )}

      {reportTarget && (
        <RadiologyReportModal request={reportTarget} onClose={() => setReportTarget(null)} onUpload={handleUploadReport} />
      )}
    </div>
  );
}