import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import UserFilters from "../components/user-management/UserFilters";
import UserTable from "../components/user-management/UserTable";
import UserFormModal from "../components/user-management/UserFormModal";
import { initialUsers } from "../data/userManagementData";

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [formModal, setFormModal] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = users.filter((u) => {
    const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !role || u.role === role;
    return matchesSearch && matchesRole;
  });

  const handleSave = (userData) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === userData.id);
      return exists ? prev.map((u) => (u.id === userData.id ? userData : u)) : [...prev, userData];
    });
  };

  const handleToggleStatus = (u) => {
    setUsers((prev) => prev.map((usr) => (usr.id === u.id ? { ...usr, status: usr.status === "Active" ? "Inactive" : "Active" } : usr)));
  };

  const handleResetPassword = (u) => {
    const temp = Math.random().toString(36).slice(-8);
    alert(`New temporary password for ${u.name}: ${temp}`);
  };

  const handleToggle2FA = (u) => {
    setUsers((prev) => prev.map((usr) => (usr.id === u.id ? { ...usr, twoFactorEnabled: !usr.twoFactorEnabled } : usr)));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={currentUser} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; User Management</p>
          </div>
          <UserFilters search={search} onSearchChange={setSearch} role={role} onRoleChange={setRole} onAddUser={() => setFormModal({ mode: "add", user: null })} />
          <UserTable users={filtered} onEdit={(u) => setFormModal({ mode: "edit", user: u })} onToggleStatus={handleToggleStatus} onResetPassword={handleResetPassword} onToggle2FA={handleToggle2FA} />
        </main>
      </div>
      {formModal && (
        <UserFormModal mode={formModal.mode} user={formModal.user} existingUsers={users} onClose={() => setFormModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}