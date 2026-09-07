import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, KeyRound, Ban, CheckCircle2, Trash2 } from "lucide-react";

export default function DoctorTable({ doctors, onView, onEdit, onToggleStatus, onResetPassword, onDelete }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No doctors match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Doctor ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Experience</th>
              <th className="px-4 py-3 font-medium">Consultation Fee</th>
              <th className="px-4 py-3 font-medium">Branch / Room</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{doc.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {doc.name.replace("Dr. ", "").charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.specialization}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{doc.department}</td>
                <td className="px-4 py-3 text-gray-600">{doc.experience} yrs</td>
                <td className="px-4 py-3 text-gray-600">₹{doc.consultationFee}</td>
                <td className="px-4 py-3 text-gray-600">
                  <p>{doc.branch}</p>
                  <p className="text-xs text-gray-400">{doc.room}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === doc.id ? null : doc.id)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === doc.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      <button
                        onClick={() => { onView(doc); setMenuOpenFor(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Eye size={14} /> View Profile
                      </button>
                      <button
                        onClick={() => { onEdit(doc); setMenuOpenFor(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Pencil size={14} /> Edit Profile
                      </button>
                      <button
                        onClick={() => { onResetPassword(doc); setMenuOpenFor(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <KeyRound size={14} /> Reset Password
                      </button>
                      <button
                        onClick={() => { onToggleStatus(doc); setMenuOpenFor(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        {doc.status === "Active" ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                        {doc.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => { onDelete(doc); setMenuOpenFor(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2"
                      >
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