import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { bloodGroups, genders } from "../../data/patientManagementData";
import { departments, initialDoctors } from "../../data/doctorManagementData";

const emptyForm = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
  assignedDoctor: "",
  department: "",
  status: "Active",
};

export default function PatientFormModal({
  mode,
  patient,
  existingPatients,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && patient) {
      setForm({ ...patient, age: String(patient.age) });
    } else {
      setForm(emptyForm);
    }
  }, [mode, patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      if (mode === "add") {
        await onSave({ ...form, age: Number(form.age) });
      } else {
        await onSave({ ...patient, ...form, age: Number(form.age) });
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {mode === "add" ? "Add New Patient" : "Edit Patient Profile"}
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          {mode === "add"
            ? "Patient ID will be auto-generated on registration."
            : "Update the patient's profile details."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[65vh] overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />

            <input
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Select Gender</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />

            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Blood Group</option>
              {bloodGroups.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              name="assignedDoctor"
              value={form.assignedDoctor}
              onChange={handleChange}
              className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Assign Doctor</option>
              {initialDoctors.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} — {d.department}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition"
            >
              {mode === "add" ? "Add Patient" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
