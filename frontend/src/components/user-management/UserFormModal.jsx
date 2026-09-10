import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { systemRoles, generateUserId } from "../../data/userManagementData";

const emptyForm = { name: "", email: "", role: "", status: "Active" };

export default function UserFormModal({ mode, user, existingUsers, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { setForm(mode === "edit" && user ? user : emptyForm); }, [mode, user]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) { alert("Please fill all required fields"); return; }

    if (mode === "add") {
      onSave({ ...form, id: generateUserId(existingUsers), lastLogin: "Never", twoFactorEnabled: false });
    } else {
      onSave(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        <h2 className="text-lg font-bold text-gray-800 mb-5">{mode === "add" ? "Add User" : "Edit User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          <select name="role" value={form.role} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
            <option value="">Select Role</option>
            {systemRoles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">{mode === "add" ? "Add User" : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}