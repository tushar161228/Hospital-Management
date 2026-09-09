import { useState, useRef, useEffect } from "react";
import { MoreVertical, CheckCircle2, XCircle, RefreshCcw, UserCog, AlertTriangle } from "lucide-react";

const statusStyles = {
  "Pending Approval": "bg-amber-50 text-amber-600",
  Confirmed: "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-600",
  Rescheduled: "bg-purple-50 text-purple-600",
};

export default function AppointmentTable({ appointments, onApprove, onCancel, onReschedule, onReassign }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No appointments match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Appointment ID</th>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Doctor</th>
              <th className="px-4 py-3 font-medium">Date / Time</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${a.isEmergency ? "bg-red-50/30" : ""}`}>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{a.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 flex items-center gap-1.5">
                    {a.isEmergency && <AlertTriangle size={13} className="text-red-500 shrink-0" />}
                    {a.patient}
                  </p>
                  <p className="text-xs text-gray-400">{a.patientId}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <p>{a.doctor}</p>
                  <p className="text-xs text-gray-400">{a.department}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <p>{a.date}</p>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === a.id ? null : a.id)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === a.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      {a.status === "Pending Approval" && (
                        <button onClick={() => { onApprove(a); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-600 hover:bg-gray-50">
                          <CheckCircle2 size={14} /> Approve
                        </button>
                      )}
                      {a.status !== "Cancelled" && a.status !== "Completed" && (
                        <>
                          <button onClick={() => { onReschedule(a); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                            <RefreshCcw size={14} /> Reschedule
                          </button>
                          <button onClick={() => { onReassign(a); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                            <UserCog size={14} /> Reassign Doctor
                          </button>
                          <button onClick={() => { onCancel(a); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50">
                            <XCircle size={14} /> Cancel
                          </button>
                        </>
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