import { useState } from "react";
import { Send } from "lucide-react";
import { labTestCategories, generateLabId } from "../../data/labManagementData";
import { doctorProfile } from "../../data/doctorDashboardData";

export default function NewLabOrderForm({ patients, existingRequests, onSave }) {
  const [patientId, setPatientId] = useState("");
  const [testName, setTestName] = useState("");
  const [category, setCategory] = useState("");
  const [normalRange, setNormalRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patientId);
    if (!patient || !testName || !category) {
      alert("Please fill patient, test name, and category");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    onSave({
      id: generateLabId(existingRequests),
      testName,
      category,
      patient: patient.name,
      patientId: patient.id,
      requestedBy: doctorProfile.name,
      assignedTech: "Unassigned",
      price: 0,
      normalRange,
      status: "Pending Assignment",
      requestedOn: today,
      resultSummary: null,
    });

    setPatientId("");
    setTestName("");
    setCategory("");
    setNormalRange("");
    alert("Lab test ordered successfully.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Order Lab Test</h3>

      <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
      </select>

      <input value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Test Name (e.g. CBC, Lipid Profile)" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
        <option value="">Select Category</option>
        {labTestCategories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <input value={normalRange} onChange={(e) => setNormalRange(e.target.value)} placeholder="Normal Range (optional)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
        <Send size={15} /> Order Test
      </button>
    </form>
  );
}