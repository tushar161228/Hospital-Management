import { useState } from "react";
import { Send } from "lucide-react";
import { radiologyTestTypes, generateRadiologyId } from "../../data/radiologyManagementData";
import { doctorProfile } from "../../data/doctorDashboardData";

export default function NewRadiologyOrderForm({ patients, existingRequests, onSave }) {
  const [patientId, setPatientId] = useState("");
  const [testType, setTestType] = useState("");
  const [bodyPart, setBodyPart] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patientId);
    if (!patient || !testType || !bodyPart) {
      alert("Please fill patient, test type, and body part");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    onSave({
      id: generateRadiologyId(existingRequests),
      testType,
      bodyPart,
      patient: patient.name,
      patientId: patient.id,
      requestedBy: doctorProfile.name,
      price: 0,
      status: "Pending Upload",
      requestedOn: today,
      reportFileName: null,
      findings: null,
    });

    setPatientId("");
    setTestType("");
    setBodyPart("");
    alert("Radiology test ordered successfully.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Order Radiology Test</h3>

      <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
      </select>

      <select value={testType} onChange={(e) => setTestType(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
        <option value="">Select Test Type</option>
        {radiologyTestTypes.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      <input value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} placeholder="Body Part / Region (e.g. Chest, Knee)" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
        <Send size={15} /> Order Test
      </button>
    </form>
  );
}