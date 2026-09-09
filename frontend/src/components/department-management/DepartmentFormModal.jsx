import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { generateDepartmentId } from "../../data/departmentManagementData";

const emptyForm = { name: "", description: "", head: "Unassigned", category: "Custom" };

export default function DepartmentFormModal({ mode, department, existingDepartments, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && department) {
      setForm(department);
    } else {
      setForm(emptyForm);
    }
  }, [mode, department]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Department name is required");
      return;
    }

    if (mode === "add") {
      onSave({ ...form, id: generateDepartmentId(existingDepartments) });
    } else {
      onSave(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-5">
          {mode === "add" ? "Create Department" : "Edit Department"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Department Name (e.g. Oncology)"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              {mode === "add" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}