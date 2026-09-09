import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StaffFilters from "../components/staff-management/StaffFilters";
import StaffTable from "../components/staff-management/StaffTable";
import StaffFormModal from "../components/staff-management/StaffFormModal";
import { initialStaff } from "../data/staffManagementData";

export default function StaffManagement() {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [formModal, setFormModal] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !role || s.role === role;
    const matchesStatus = !status || s.status === status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSave = (staffData) => {
    setStaff((prev) => {
      const exists = prev.some((s) => s.id === staffData.id);
      return exists
        ? prev.map((s) => (s.id === staffData.id ? staffData : s))
        : [...prev, staffData];
    });
  };

  const handleToggleStatus = (member) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === member.id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      )
    );
  };

  const handleDelete = (member) => {
    if (confirm(`Delete ${member.name}'s profile? This cannot be undone.`)) {
      setStaff((prev) => prev.filter((s) => s.id !== member.id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Staff Management</p>
          </div>

          <StaffFilters
            search={search}
            onSearchChange={setSearch}
            role={role}
            onRoleChange={setRole}
            status={status}
            onStatusChange={setStatus}
            onAddStaff={() => setFormModal({ mode: "add", staffMember: null })}
          />

          <StaffTable
            staff={filteredStaff}
            onEdit={(s) => setFormModal({ mode: "edit", staffMember: s })}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {formModal && (
        <StaffFormModal
          mode={formModal.mode}
          staffMember={formModal.staffMember}
          existingStaff={staff}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}