import { useState } from "react";
import { X } from "lucide-react";
import { leaveTypes, generateLeaveId, getAllPeople } from "../../data/scheduleManagementData";

const emptyForm = { personName: "", personType: "", leaveType: "", fromDate: "", toDate: "", reason: "" };

export default function LeaveFormModal({ existingRequests, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const people = getAllPeople();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonSelect = (e) => {
    const selected = people.find((p) => p.name === e.target.value);
    setForm((prev) => ({ ...prev, personName: selected?.name || "", personType: selected?.type || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.personName || !form.leaveType || !form.fromDate || !form.toDate || !form.reason) {
      alert("Please fill all fields");
      return;
    }
    if (new Date(form.toDate) < new Date(form.fromDate)) {
      alert("To date cannot be before From date");
      return;
    }

    const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const newRequest = {
      ...form,
      id: generateLeaveId(existingRequests),
      fromDate: fmt(form.fromDate),
      toDate: fmt(form.toDate),
      status: "Pending",
      appliedOn: today,
    };

    onSave(newRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-5">Apply Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select onChange={handlePersonSelect} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Doctor / Staff</option>
            {people.map((p) => (
              <option key={p.name} value={p.name}>{p.name} ({p.type})</option>
            ))}
          </select>

          <select name="leaveType" value={form.leaveType} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Leave Type</option>
            {leaveTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">From Date</label>
              <input name="fromDate" type="date" value={form.fromDate} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">To Date</label>
              <input name="toDate" type="date" value={form.toDate} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            </div>
          </div>

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for leave"
            rows={3}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}