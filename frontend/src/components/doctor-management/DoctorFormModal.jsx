import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { departments, branches, generateDoctorId, generateEmployeeId, generateUsername, generateTempPassword } from "../../data/doctorManagementData";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const emptyForm = {
  name: "", email: "", phone: "", department: "", specialization: "",
  qualification: "", license: "", experience: "", consultationFee: "",
  branch: "", room: "", workingDays: [], workingHours: "", status: "Active",
};

export default function DoctorFormModal({ mode, doctor, existingDoctors, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [generatedCreds, setGeneratedCreds] = useState(null);

  useEffect(() => {
    if (mode === "edit" && doctor) {
      setForm({ ...doctor, experience: String(doctor.experience), consultationFee: String(doctor.consultationFee) });
    } else {
      setForm(emptyForm);
    }
  }, [mode, doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.department || !form.branch) {
      alert("Please fill all required fields");
      return;
    }

    if (mode === "add") {
      const id = generateDoctorId(existingDoctors);
      const empId = generateEmployeeId(existingDoctors);
      const username = generateUsername(form.name);
      const tempPassword = generateTempPassword();

      const newDoctor = {
        ...form,
        id,
        empId,
        username,
        experience: Number(form.experience) || 0,
        consultationFee: Number(form.consultationFee) || 0,
      };

      setGeneratedCreds({ id, empId, username, tempPassword });
      onSave(newDoctor);
    } else {
      onSave({
        ...form,
        experience: Number(form.experience) || 0,
        consultationFee: Number(form.consultationFee) || 0,
      });
      onClose();
    }
  };

  if (generatedCreds) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Doctor Added Successfully</h2>
          <p className="text-sm text-gray-500 mb-5">Share these login credentials with the doctor.</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-1.5">
            <p><span className="text-gray-400">Doctor ID:</span> <span className="font-mono">{generatedCreds.id}</span></p>
            <p><span className="text-gray-400">Employee ID:</span> <span className="font-mono">{generatedCreds.empId}</span></p>
            <p><span className="text-gray-400">Username:</span> <span className="font-mono">{generatedCreds.username}</span></p>
            <p><span className="text-gray-400">Temp Password:</span> <span className="font-mono">{generatedCreds.tempPassword}</span></p>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {mode === "add" ? "Add New Doctor" : "Edit Doctor Profile"}
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          {mode === "add" ? "Doctor ID, Employee ID, and login credentials will be auto-generated." : "Update the doctor's profile details."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name (e.g. Dr. John Doe)" required className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <select name="department" value={form.department} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification (e.g. MBBS, MD)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="license" value={form.license} onChange={handleChange} placeholder="Medical License Number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <input name="experience" type="number" min="0" value={form.experience} onChange={handleChange} placeholder="Experience (years)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="consultationFee" type="number" min="0" value={form.consultationFee} onChange={handleChange} placeholder="Consultation Fee (₹)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <select name="branch" value={form.branch} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
              <option value="">Select Branch</option>
              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <input name="room" value={form.room} onChange={handleChange} placeholder="Room / Cabin Number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1.5">Working Days</p>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    form.workingDays.includes(day)
                      ? "bg-blue-700 text-white border-blue-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <input name="workingHours" value={form.workingHours} onChange={handleChange} placeholder="Working Hours (e.g. 09:00 AM - 05:00 PM)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              {mode === "add" ? "Add Doctor" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}