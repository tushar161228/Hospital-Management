import { useState, useRef, useEffect } from "react";
import { MoreVertical, UserCog, CheckCircle2, FileText } from "lucide-react";

const statusStyles = {
  "Pending Assignment": "bg-gray-100 text-gray-500",
  "In Progress": "bg-blue-50 text-blue-600",
  "Pending Approval": "bg-amber-50 text-amber-600",
  "Report Ready": "bg-green-50 text-green-600",
};

export default function LabTestTable({ requests, onAssignTech, onApproveReport, onViewReport }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No lab requests match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Lab ID</th>
              <th className="px-4 py-3 font-medium">Test</th>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Requested By</th>
              <th className="px-4 py-3 font-medium">Assigned Tech</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{r.testName}</p>
                  <p className="text-xs text-gray-400">{r.category}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{r.patient}</td>
                <td className="px-4 py-3 text-gray-600">{r.requestedBy}</td>
                <td className="px-4 py-3 text-gray-600">{r.assignedTech}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === r.id ? null : r.id)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === r.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      {r.status === "Pending Assignment" && (
                        <button onClick={() => { onAssignTech(r); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                          <UserCog size={14} /> Assign Technician
                        </button>
                      )}
                      {r.status === "Pending Approval" && (
                        <button onClick={() => { onApproveReport(r); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-600 hover:bg-gray-50">
                          <CheckCircle2 size={14} /> Approve & Release Report
                        </button>
                      )}
                      {(r.status === "Pending Approval" || r.status === "Report Ready") && (
                        <button onClick={() => { onViewReport(r); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                          <FileText size={14} /> View Report
                        </button>
                      )}
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