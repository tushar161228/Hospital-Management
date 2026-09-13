import { useState } from "react";
import { Send } from "lucide-react";
import { leaveTypes, generateLeaveId } from "../../data/scheduleManagementData";
import { doctorProfile } from "../../data/doctorDashboardData";

export default function LeaveApplyForm({ existingRequests, onSave }) {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveType || !fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }
    if (new Date(toDate) < new Date(fromDate)) {
      alert("To date cannot be before From date");
      return;
    }

    const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    onSave({
      id: generateLeaveId(existingRequests),
      personName: doctorProfile.name,
      personType: "Doctor",
      leaveType,
      fromDate: fmt(fromDate),
      toDate: fmt(toDate),
      reason,
      status: "Pending",
      appliedOn: today,
    });

    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
    alert("Leave request submitted for approval.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Apply for Leave</h3>

      <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
        <option value="">Select Leave Type</option>
        {leaveTypes.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
        </div>
      </div>

      <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="Reason for leave" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
        <Send size={15} /> Submit Request
      </button>
    </form>
  );
}