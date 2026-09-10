import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import RoleCard from "../components/roles-permissions/RoleCard";
import PermissionMatrix from "../components/roles-permissions/PermissionMatrix";
import RoleFormModal from "../components/roles-permissions/RoleFormModal";
import { initialRoles } from "../data/rolesPermissionsData";

export default function RolesPermissions() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(initialRoles[0]);
  const [formOpen, setFormOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const handleSaveRole = (updatedRole) => {
    setRoles((prev) => prev.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
    setSelectedRole(updatedRole);
  };

  const handleCreateRole = (newRole) => {
    setRoles((prev) => [...prev, newRole]);
  };

  const handleDeleteRole = (role) => {
    if (confirm(`Delete "${role.name}" role? Users assigned to it will need reassignment.`)) {
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      if (selectedRole?.id === role.id) setSelectedRole(null);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Roles & Permissions</h1>
              <p className="text-sm text-gray-400 mt-0.5">Home &gt; Roles & Permissions</p>
            </div>
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition"
            >
              <Plus size={16} />
              Create Role
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 space-y-4">
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  isSelected={selectedRole?.id === role.id}
                  onSelect={setSelectedRole}
                  onEdit={setSelectedRole}
                  onDelete={handleDeleteRole}
                />
              ))}
            </div>

            <div className="lg:col-span-2">
              <PermissionMatrix role={selectedRole} onSave={handleSaveRole} />
            </div>
          </div>
        </main>
      </div>

      {formOpen && (
        <RoleFormModal existingRoles={roles} onClose={() => setFormOpen(false)} onSave={handleCreateRole} />
      )}
    </div>
  );
}