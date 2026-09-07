import { patientQueue } from "../../data/doctorDashboardData";

const positionColor = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-gray-400"];

export default function PatientQueue() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Patient Queue</h3>
        <button
          onClick={() => alert("Full queue view would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View Full Queue
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {patientQueue.map((p) => (
          <div key={p.position} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-7 h-7 rounded-full text-white text-sm font-semibold flex items-center justify-center shrink-0 ${
                  positionColor[p.position - 1] || "bg-gray-400"
                }`}
              >
                {p.position}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{p.patient}</p>
                <p className="text-xs text-gray-500">{p.meta}</p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-xs text-gray-400">Waiting Time</p>
              <p className="text-sm font-semibold text-red-500">{p.waitTime}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Queue management panel would open here")}
        className="w-full mt-4 bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition flex items-center justify-center gap-2"
      >
        Manage Queue
      </button>
    </div>
  );
}