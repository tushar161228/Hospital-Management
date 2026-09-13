import { useNavigate } from "react-router-dom";
import { emergencyCases } from "../../data/dashboardData";

const priorityStyles = {
  Critical: "bg-red-50 text-red-600",
  High: "bg-amber-50 text-amber-600",
};

export default function EmergencyCases() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Emergency Cases</h3>
        <button
          onClick={() => navigate("/appointments")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {emergencyCases.map((c) => (
          <div
            key={c.id}
            className="flex items-start justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0"
          >
            <div>
              <p className="text-xs text-gray-400">{c.id}</p>
              <p className="text-sm font-medium text-gray-800">{c.title}</p>
              <p className="text-xs text-gray-500">{c.patient}</p>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-xs text-gray-400 mb-1">{c.time}</p>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${priorityStyles[c.priority]}`}
              >
                {c.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
