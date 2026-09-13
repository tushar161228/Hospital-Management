import { Scan } from "lucide-react";

const statusStyles = {
  "Pending Upload": "bg-amber-50 text-amber-600",
  "In Progress": "bg-blue-50 text-blue-600",
  "Report Ready": "bg-green-50 text-green-600",
};

export default function DoctorRadiologyOrderList({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No radiology tests ordered yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">My Radiology Orders</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {requests.map((r) => (
          <div key={r.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-start gap-2 min-w-0">
                <Scan size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800">{r.testType} — {r.bodyPart}</p>
                  <p className="text-xs text-gray-400">{r.patient}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusStyles[r.status]}`}>{r.status}</span>
            </div>
            {r.findings && (
              <p className="text-xs text-gray-600 mt-1.5 bg-gray-50 rounded p-2">{r.findings}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}