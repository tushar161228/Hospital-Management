import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Ban, CheckCircle2, Trash2 } from "lucide-react";

const roleStyles = {
  Receptionist: "bg-blue-50 text-blue-600",
  Nurse: "bg-green-50 text-green-600",
  "Lab Technician": "bg-purple-50 text-purple-600",
  Pharmacist: "bg-orange-50 text-orange-600",
  "Billing Executive": "bg-amber-50 text-amber-600",
};

export default function StaffTable({ staff, onEdit, onToggleStatus, onDelete }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (staff.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No staff match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Staff ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium">Joined On</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{s.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.empId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleStyles[s.role]}`}>
                    {s.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <p>{s.phone}</p>
                  <p className="text-xs text-gray-400">{s.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{s.branch}</td>
                <td className="px-4 py-3 text-gray-600">{s.joinedOn}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      s.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === s.id ? null : s.id)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === s.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      <button onClick={() => { onEdit(s); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        <Pencil size={14} /> Edit Profile
                      </button>
                      <button onClick={() => { onToggleStatus(s); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        {s.status === "Active" ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                        {s.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => { onDelete(s); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}