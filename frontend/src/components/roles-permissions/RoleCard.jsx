import { ShieldCheck, Users, Pencil, Trash2 } from "lucide-react";

export default function RoleCard({ role, onEdit, onDelete, onSelect, isSelected }) {
  const totalPermissions = Object.values(role.permissions).filter((p) => p.view || p.edit || p.delete).length;

  return (
    <div
      onClick={() => onSelect(role)}
      className={`bg-white rounded-xl border p-5 cursor-pointer transition ${
        isSelected ? "border-blue-700 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <ShieldCheck size={20} />
        </div>
        <span className="text-xs text-gray-400 font-mono">{role.id}</span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-1">{role.name}</h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{role.description}</p>

      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users size={14} className="text-gray-400" />
          {role.userCount} user{role.userCount !== 1 ? "s" : ""}
        </div>
        <span className="text-xs text-gray-400">{totalPermissions} modules</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(role); }}
          className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-600 hover:bg-gray-50"
        >
          <Pencil size={13} /> Edit Permissions
        </button>
        {role.name !== "Super Admin" && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(role); }}
            className="flex items-center justify-center border border-gray-200 rounded-lg py-1.5 px-2.5 text-xs text-red-600 hover:bg-red-50"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </div>
  );
}