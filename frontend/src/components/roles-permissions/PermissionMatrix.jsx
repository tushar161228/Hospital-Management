import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { permissionModules } from "../../data/rolesPermissionsData";

export default function PermissionMatrix({ role, onSave }) {
  const [permissions, setPermissions] = useState(role?.permissions || {});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setPermissions(role?.permissions || {});
    setDirty(false);
  }, [role]);

  if (!role) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        Select a role from the left to view or edit its permissions.
      </div>
    );
  }

  const toggle = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: { ...prev[module], [action]: !prev[module]?.[action] },
    }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave({ ...role, permissions });
    setDirty(false);
  };

  const isSuperAdmin = role.name === "Super Admin";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-800">{role.name} — Permissions</h3>
        {dirty && (
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-blue-700 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-blue-800 transition"
          >
            <Save size={13} /> Save Changes
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-4">{role.description}</p>

      {isSuperAdmin && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-4">
          Super Admin has full access by default and cannot be restricted.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
              <th className="py-2 font-medium">Module</th>
              <th className="py-2 font-medium text-center w-20">View</th>
              <th className="py-2 font-medium text-center w-20">Edit</th>
              <th className="py-2 font-medium text-center w-20">Delete</th>
            </tr>
          </thead>
          <tbody>
            {permissionModules.map((module) => {
              const perm = permissions[module] || { view: false, edit: false, delete: false };
              return (
                <tr key={module} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 text-gray-700">{module}</td>
                  {["view", "edit", "delete"].map((action) => (
                    <td key={action} className="py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={perm[action]}
                        disabled={isSuperAdmin}
                        onChange={() => toggle(module, action)}
                        className="w-4 h-4 accent-blue-700 disabled:opacity-50"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}