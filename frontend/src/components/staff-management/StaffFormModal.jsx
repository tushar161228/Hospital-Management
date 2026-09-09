import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { staffRoles, generateStaffId, generateStaffEmpId } from "../../data/staffManagementData";
import { branches } from "../../data/doctorManagementData";

const emptyForm = { name: "", role: "", email: "", phone: "", branch: "", status: "Active" };

export default function StaffFormModal({ mode, staffMember, existingStaff, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [generatedCreds, setGeneratedCreds] = useState(null);

  useEffect(() => {
    if (mode === "edit" && staffMember) {
      setForm(staffMember);
    } else {
      setForm(emptyForm);
    }
  }, [mode, staffMember]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.email || !form.phone || !form.branch) {
      alert("Please fill all required fields");
      return;
    }

    if (mode === "add") {
      const id = generateStaffId(existingStaff);
      const empId = generateStaffEmpId(existingStaff);
      const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const username = form.name.toLowerCase().replace(" ", ".");
      const tempPassword = Math.random().toString(36).slice(-8);

      const newStaff = { ...form, id, empId, joinedOn: today };
      setGeneratedCreds({ id, empId, username, tempPassword });
      onSave(newStaff);
    } else {
      onSave(form);
      onClose();
    }
  };

  if (generatedCreds) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Staff Added Successfully</h2>
          <p className="text-sm text-gray-500 mb-5">Share these login credentials with the staff member.</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-1.5">
            <p><span className="text-gray-400">Staff ID:</span> <span className="font-mono">{generatedCreds.id}</span></p>
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {mode === "add" ? "Add New Staff" : "Edit Staff Profile"}
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          {mode === "add" ? "Staff ID, Employee ID, and login credentials will be auto-generated." : "Update the staff member's profile."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

          <select name="role" value={form.role} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Role</option>
            {staffRoles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

          <select name="branch" value={form.branch} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Branch</option>
            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              {mode === "add" ? "Add Staff" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}