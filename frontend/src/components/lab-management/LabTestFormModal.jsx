import { useState } from "react";
import { X } from "lucide-react";
import { labTestCategories, generateLabId, initialPatients } from "../../data/labManagementData";
import { initialDoctors } from "../../data/doctorManagementData";

const emptyForm = { testName: "", category: "", patientId: "", requestedBy: "", price: "", normalRange: "" };

export default function LabTestFormModal({ existingRequests, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = initialPatients.find((p) => p.id === form.patientId);
    if (!form.testName || !form.category || !patient || !form.requestedBy) {
      alert("Please fill all required fields");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    onSave({
      id: generateLabId(existingRequests),
      testName: form.testName,
      category: form.category,
      patient: patient.name,
      patientId: patient.id,
      requestedBy: form.requestedBy,
      assignedTech: "Unassigned",
      price: Number(form.price) || 0,
      normalRange: form.normalRange,
      status: "Pending Assignment",
      requestedOn: today,
      resultSummary: null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-5">New Lab Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="testName" value={form.testName} onChange={handleChange} placeholder="Test Name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

          <select name="category" value={form.category} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Category</option>
            {labTestCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select name="patientId" value={form.patientId} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Patient</option>
            {initialPatients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
          </select>

          <select name="requestedBy" value={form.requestedBy} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Requested By (Doctor)</option>
            {initialDoctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} placeholder="Price (₹)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="normalRange" value={form.normalRange} onChange={handleChange} placeholder="Normal Range" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">Create Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}