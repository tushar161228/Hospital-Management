import { useState, useRef, useEffect } from "react";
import { MoreVertical, CheckCircle2, XCircle } from "lucide-react";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-600",
};

export default function LeaveTable({ leaveRequests, onApprove, onReject }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (leaveRequests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No leave requests match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Leave ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((lv) => (
              <tr key={lv.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{lv.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{lv.personName}</p>
                  <p className="text-xs text-gray-400">{lv.personType}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{lv.leaveType}</td>
                <td className="px-4 py-3 text-gray-600">
                  {lv.fromDate === lv.toDate ? lv.fromDate : `${lv.fromDate} — ${lv.toDate}`}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate" title={lv.reason}>{lv.reason}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[lv.status]}`}>
                    {lv.status}
                  </span>
                  {lv.status === "Rejected" && lv.rejectionReason && (
                    <p className="text-xs text-gray-400 mt-0.5 max-w-[140px] truncate" title={lv.rejectionReason}>
                      {lv.rejectionReason}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-right relative">
                  {lv.status === "Pending" ? (
                    <>
                      <button onClick={() => setMenuOpenFor(menuOpenFor === lv.id ? null : lv.id)}>
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                      {menuOpenFor === lv.id && (
                        <div ref={menuRef} className="absolute right-4 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                          <button onClick={() => { onApprove(lv); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-600 hover:bg-gray-50">
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button onClick={() => { onReject(lv); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50">
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
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