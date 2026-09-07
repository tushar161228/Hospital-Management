import { useState } from "react";
import { FileText } from "lucide-react";
import { recentPrescriptions } from "../../data/doctorDashboardData";

const statusStyles = {
  Signed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Draft: "bg-gray-100 text-gray-500",
};

export default function RecentPrescriptions() {
  const [rows, setRows] = useState(recentPrescriptions);

  const handleSign = (idx) => {
    setRows((prev) =>
      prev.map((r, i) => (i === idx && r.status !== "Signed" ? { ...r, status: "Signed" } : r))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Recent Prescriptions</h3>
        <button
          onClick={() => alert("Full prescriptions list would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((rx, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{rx.patient}</p>
                <p className="text-xs text-gray-400">{rx.date}</p>
              </div>
            </div>
            <button
              onClick={() => handleSign(idx)}
              disabled={rx.status === "Signed"}
              className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusStyles[rx.status]} ${
                rx.status !== "Signed" ? "hover:opacity-80 cursor-pointer" : "cursor-default"
              }`}
              title={rx.status !== "Signed" ? "Click to sign" : "Already signed"}
            >
              {rx.status}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Full prescriptions list would open here")}
        className="w-full mt-3 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
      >
        View All Prescriptions →
      </button>
    </div>
  );
}