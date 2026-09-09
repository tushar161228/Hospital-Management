import { useState } from "react";
import { X } from "lucide-react";
import { initialDoctors, initialPatients, appointmentTypes, generateAppointmentId } from "../../data/appointmentManagementData";

const emptyForm = {
  patient: "", patientId: "", doctor: "", department: "",
  date: "", time: "", type: "Walk-in", isEmergency: false,
};

export default function AppointmentFormModal({ existingAppointments, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePatientSelect = (e) => {
    const selected = initialPatients.find((p) => p.id === e.target.value);
    setForm((prev) => ({
      ...prev,
      patientId: selected?.id || "",
      patient: selected?.name || "",
    }));
  };

  const handleDoctorSelect = (e) => {
    const selected = initialDoctors.find((d) => d.name === e.target.value);
    setForm((prev) => ({
      ...prev,
      doctor: selected?.name || "",
      department: selected?.department || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }

    const newAppointment = {
      ...form,
      id: generateAppointmentId(existingAppointments),
      status: form.isEmergency ? "Confirmed" : "Pending Approval",
      cancelReason: null,
    };

    onSave(newAppointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">New / Walk-in Appointment</h2>
        <p className="text-sm text-gray-500 mb-5">
          Emergency appointments skip approval and are confirmed immediately with priority queue placement.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            onChange={handlePatientSelect}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Select Patient</option>
            {initialPatients.map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
            ))}
          </select>

          <select
            onChange={handleDoctorSelect}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Select Doctor</option>
            {initialDoctors.map((d) => (
              <option key={d.id} value={d.name}>{d.name} — {d.department}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input name="date" type="date" value={form.date} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="time" type="time" value={form.time} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          </div>

          <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            {appointmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
            <input
              type="checkbox"
              name="isEmergency"
              checked={form.isEmergency}
              onChange={handleChange}
            />
            Flag as Emergency (priority queue, skips approval)
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}