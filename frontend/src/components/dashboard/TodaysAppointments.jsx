import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { todaysAppointments } from "../../data/dashboardData";

const statusStyles = {
  Completed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function TodaysAppointments() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(todaysAppointments);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleStatus = (idx) => {
    setRows((prev) =>
      prev.map((r, i) =>
        i === idx ? { ...r, status: r.status === "Completed" ? "Pending" : "Completed" } : r
      )
    );
    setMenuOpenFor(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Today's Appointments</h3>
        <button onClick={() => navigate("/appointments")} className="text-sm text-blue-700 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Time</th>
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Patient</th>
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Doctor</th>
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Department</th>
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Type</th>
              <th className="pb-2 pr-3 font-medium whitespace-nowrap">Status</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">{row.time}</td>
                <td className="py-2.5 pr-3 text-gray-800 font-medium whitespace-nowrap">{row.patient}</td>
                <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">{row.doctor}</td>
                <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">{row.department}</td>
                <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">{row.type}</td>
                <td className="py-2.5 pr-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === idx ? null : idx)}>
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === idx && (
                    <div ref={menuRef} className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 text-left">
                      <button
                        onClick={() => toggleStatus(idx)}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        Mark as {row.status === "Completed" ? "Pending" : "Completed"}
                      </button>
                      <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                        View Details
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