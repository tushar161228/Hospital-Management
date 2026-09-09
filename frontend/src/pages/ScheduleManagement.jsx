import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import LeaveFilters from "../components/schedule-management/LeaveFilters";
import LeaveTable from "../components/schedule-management/LeaveTable";
import LeaveFormModal from "../components/schedule-management/LeaveFormModal";
import HolidayCalendar from "../components/schedule-management/HolidayCalendar";
import { initialLeaveRequests } from "../data/scheduleManagementData";

export default function ScheduleManagement() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = leaveRequests.filter((lv) => {
    const matchesSearch =
      !search ||
      lv.personName.toLowerCase().includes(search.toLowerCase()) ||
      lv.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || lv.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (req) => {
    setLeaveRequests((prev) => [...prev, req]);
  };

  const handleApprove = (lv) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === lv.id ? { ...l, status: "Approved" } : l))
    );
  };

  const handleReject = (lv) => {
    const reason = prompt(`Reason for rejecting ${lv.personName}'s leave request:`);
    if (!reason) return;
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === lv.id ? { ...l, status: "Rejected", rejectionReason: reason } : l))
    );
  };

  const pendingCount = leaveRequests.filter((l) => l.status === "Pending").length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Schedule & Leave Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Schedule</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Pending Approvals</p>
                  <p className="text-xl font-bold text-amber-600">{pendingCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Requests</p>
                  <p className="text-xl font-bold text-gray-800">{leaveRequests.length}</p>
                </div>
              </div>

              <LeaveFilters
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
                onApplyLeave={() => setFormOpen(true)}
              />

              <LeaveTable
                leaveRequests={filtered}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>

            <div className="lg:col-span-1">
              <HolidayCalendar />
            </div>
          </div>
        </main>
      </div>

      {formOpen && (
        <LeaveFormModal
          existingRequests={leaveRequests}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}