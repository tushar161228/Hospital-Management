import { Search, Plus } from "lucide-react";
import { systemRoles } from "../../data/userManagementData";

export default function UserFilters({ search, onSearchChange, role, onRoleChange, onAddUser }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by name, email..." className="outline-none text-sm w-full" />
        </div>
        <select value={role} onChange={(e) => onRoleChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
          <option value="">All Roles</option>
          {systemRoles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <button onClick={onAddUser} className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition shrink-0">
        <Plus size={16} /> Add User
      </button>
    </div>
  );
}