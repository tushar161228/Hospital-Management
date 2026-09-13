import { useState } from "react";
import { Plus, Trash2, Send } from "lucide-react";
import { medicineMaster, generatePrescriptionId } from "../../data/prescriptionManagementData";
import { doctorProfile } from "../../data/doctorDashboardData";

export default function NewPrescriptionForm({ patients, existingPrescriptions, onSave }) {
  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  const [notes, setNotes] = useState("");

  const handleMedChange = (idx, field, value) => {
    setMedicines((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };

  const addMedicine = () => setMedicines((prev) => [...prev, { name: "", dosage: "", duration: "" }]);
  const removeMedicine = (idx) => setMedicines((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patientId);
    if (!patient || medicines.some((m) => !m.name || !m.dosage)) {
      alert("Please select a patient and fill in all medicine details");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    onSave({
      id: generatePrescriptionId(existingPrescriptions),
      patient: patient.name,
      patientId: patient.id,
      doctor: doctorProfile.name,
      date: today,
      status: "Signed",
      medicines,
      notes,
    });

    setPatientId("");
    setMedicines([{ name: "", dosage: "", duration: "" }]);
    setNotes("");
    alert("Prescription created and signed successfully.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Write New Prescription</h3>

      <select
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
      >
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
      </select>

      <div>
        <p className="text-xs text-gray-500 mb-2">Medicines</p>
        <div className="space-y-2">
          {medicines.map((med, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                list="medicine-options"
                value={med.name}
                onChange={(e) => handleMedChange(idx, "name", e.target.value)}
                placeholder="Medicine name"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
              />
              <input
                value={med.dosage}
                onChange={(e) => handleMedChange(idx, "dosage", e.target.value)}
                placeholder="Dosage (e.g. 1 tablet twice daily)"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
              />
              <div className="flex gap-2">
                <input
                  value={med.duration}
                  onChange={(e) => handleMedChange(idx, "duration", e.target.value)}
                  placeholder="Duration (e.g. 5 days)"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                />
                {medicines.length > 1 && (
                  <button type="button" onClick={() => removeMedicine(idx)} className="text-red-500 shrink-0">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <datalist id="medicine-options">
          {medicineMaster.map((m) => <option key={m.name} value={m.name} />)}
        </datalist>
        <button type="button" onClick={addMedicine} className="flex items-center gap-1 text-sm text-blue-700 mt-2 hover:underline">
          <Plus size={14} /> Add Medicine
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Additional notes for the patient"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
      />

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
        <Send size={15} /> Create & Sign Prescription
      </button>
    </form>
  );
}