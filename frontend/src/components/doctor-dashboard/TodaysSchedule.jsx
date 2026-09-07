import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { todaysSchedule } from "../../data/doctorDashboardData";

const statusStyles = {
  Completed: "bg-green-50 text-green-600",
  "In Progress": "bg-blue-50 text-blue-600",
  "In Queue": "bg-amber-50 text-amber-600",
  Scheduled: "bg-gray-100 text-gray-500",
};

const nextStatus = {
  Scheduled: "In Queue",
  "In Queue": "In Progress",
  "In Progress": "Completed",
  Completed: "Completed",
};

export default function TodaysSchedule() {
  const [rows, setRows] = useState(todaysSchedule);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const advanceStatus = (idx) => {
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, status: nextStatus[r.status] } : r))
    );
    setMenuOpenFor(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
        <button
          onClick={() => alert("Full schedule view would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View Full Schedule
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${
              row.status === "In Queue" ? "bg-amber-50/50 border border-amber-100" : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-sm text-gray-600 w-20 shrink-0">{row.time}</div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {row.patient} <span className="text-xs text-gray-400 font-normal">Token #{row.token}</span>
                </p>
                <p className="text-xs text-gray-500">{row.meta}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 relative">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
                {row.status}
              </span>
              <button onClick={() => setMenuOpenFor(menuOpenFor === idx ? null : idx)}>
                <MoreVertical size={16} className="text-gray-400" />
              </button>
              {menuOpenFor === idx && (
                <div ref={menuRef} className="absolute right-0 top-8 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  {row.status !== "Completed" && (
                    <button
                      onClick={() => advanceStatus(idx)}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      Move to {nextStatus[row.status]}
                    </button>
                  )}
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                    View Patient Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Full appointments list would open here")}
        className="w-full mt-3 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
      >
        View All Appointments →
      </button>
    </div>
  );
}