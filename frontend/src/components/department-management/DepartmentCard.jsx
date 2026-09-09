import { Building2, Users, Pencil, Trash2, UserCog } from "lucide-react";
import { doctorCountFor } from "../../data/departmentManagementData";

export default function DepartmentCard({
  department,
  onEdit,
  onDelete,
  onAssignHead,
}) {
  const doctorCount = doctorCountFor(department.name);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Building2 size={20} />
        </div>
        <span className="text-xs text-gray-400 font-mono">{department.id}</span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-1">{department.name}</h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {department.description}
      </p>

      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users size={14} className="text-gray-400" />
          {doctorCount} Doctor{doctorCount !== 1 ? "s" : ""}
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${department.category === "Predefined" ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-600"}`}
        >
          {department.category}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400 mb-0.5">Department Head</p>
        <p className="text-sm font-medium text-gray-700 mb-3">
          {department.head}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onAssignHead(department)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-600 hover:bg-gray-50"
          >
            <UserCog size={13} /> Assign Head
          </button>
          <button
            onClick={() => onEdit(department)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-600 hover:bg-gray-50"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(department)}
            className="flex items-center justify-center border border-gray-200 rounded-lg py-1.5 px-2.5 text-xs text-red-600 hover:bg-red-50"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
