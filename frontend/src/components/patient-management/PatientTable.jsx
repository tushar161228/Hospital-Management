import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, FileText, Ban, CheckCircle2, Trash2 } from "lucide-react";

export default function PatientTable({ patients, onView, onEdit, onToggleStatus, onDelete, onViewRecords }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No patients match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Patient ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Age / Gender</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Assigned Doctor</th>
              <th className="px-4 py-3 font-medium">Last Visit</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.bloodGroup}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.age} / {p.gender}</td>
                <td className="px-4 py-3 text-gray-600">{p.phone}</td>
                <td className="px-4 py-3 text-gray-600">
                  <p>{p.assignedDoctor}</p>
                  <p className="text-xs text-gray-400">{p.department}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.lastVisit}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === p.id ? null : p.id)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === p.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      <button onClick={() => { onView(p); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        <Eye size={14} /> View Profile
                      </button>
                      <button onClick={() => { onEdit(p); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        <Pencil size={14} /> Edit Profile
                      </button>
                      <button onClick={() => { onViewRecords(p); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        <FileText size={14} /> Medical Records
                      </button>
                      <button onClick={() => { onToggleStatus(p); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        {p.status === "Active" ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                        {p.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => { onDelete(p); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2">
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