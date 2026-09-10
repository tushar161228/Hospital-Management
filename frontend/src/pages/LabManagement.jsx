import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import LabTestFilters from "../components/lab-management/LabTestFilters";
import LabTestTable from "../components/lab-management/LabTestTable";
import LabTestFormModal from "../components/lab-management/LabTestFormModal";
import LabReportModal from "../components/lab-management/LabReportModal";
import { initialLabRequests, getLabTechnicians } from "../data/labManagementData";

export default function LabManagement() {
  const [requests, setRequests] = useState(initialLabRequests);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !search ||
      r.testName.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || r.category === category;
    const matchesStatus = !status || r.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSave = (req) => setRequests((prev) => [...prev, req]);

  const handleAssignTech = (req) => {
    const techs = getLabTechnicians();
    const names = techs.map((t) => t.name).join("\n");
    const choice = prompt(`Assign technician for ${req.testName}:\n${names}`, techs[0]?.name || "");
    if (!choice) return;
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, assignedTech: choice, status: "In Progress" } : r))
    );
  };

  const handleApproveReport = (req, summary) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Report Ready", resultSummary: summary } : r))
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Laboratory Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Laboratory</p>
          </div>

          <LabTestFilters
            search={search} onSearchChange={setSearch}
            category={category} onCategoryChange={setCategory}
            status={status} onStatusChange={setStatus}
            onNewRequest={() => setFormOpen(true)}
          />

          <LabTestTable
            requests={filtered}
            onAssignTech={handleAssignTech}
            onApproveReport={setReportTarget}
            onViewReport={setReportTarget}
          />
        </main>
      </div>

      {formOpen && (
        <LabTestFormModal existingRequests={requests} onClose={() => setFormOpen(false)} onSave={handleSave} />
      )}

      {reportTarget && (
        <LabReportModal request={reportTarget} onClose={() => setReportTarget(null)} onApprove={handleApproveReport} />
      )}
    </div>
  );
}