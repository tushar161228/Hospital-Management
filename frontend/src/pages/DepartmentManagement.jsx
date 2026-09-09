import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DepartmentCard from "../components/department-management/DepartmentCard";
import DepartmentFormModal from "../components/department-management/DepartmentFormModal";
import { initialDepartments, initialDoctors } from "../data/departmentManagementData";

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [formModal, setFormModal] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const handleSave = (deptData) => {
    setDepartments((prev) => {
      const exists = prev.some((d) => d.id === deptData.id);
      return exists
        ? prev.map((d) => (d.id === deptData.id ? deptData : d))
        : [...prev, deptData];
    });
  };

  const handleDelete = (dept) => {
    if (confirm(`Delete "${dept.name}" department? This cannot be undone.`)) {
      setDepartments((prev) => prev.filter((d) => d.id !== dept.id));
    }
  };

  const handleAssignHead = (dept) => {
    const options = initialDoctors.map((d) => d.name).join("\n");
    const choice = prompt(`Assign Department Head for ${dept.name}:\n${options}\n\nType exact doctor name:`, dept.head);
    if (!choice) return;
    setDepartments((prev) =>
      prev.map((d) => (d.id === dept.id ? { ...d, head: choice } : d))
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Department Management</h1>
              <p className="text-sm text-gray-400 mt-0.5">Home &gt; Department Management</p>
            </div>
            <button
              onClick={() => setFormModal({ mode: "add", department: null })}
              className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition"
            >
              <Plus size={16} />
              Create Department
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                onEdit={(d) => setFormModal({ mode: "edit", department: d })}
                onDelete={handleDelete}
                onAssignHead={handleAssignHead}
              />
            ))}
          </div>
        </main>
      </div>

      {formModal && (
        <DepartmentFormModal
          mode={formModal.mode}
          department={formModal.department}
          existingDepartments={departments}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}