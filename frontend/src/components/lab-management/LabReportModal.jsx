import { useState } from "react";
import { X, FlaskConical } from "lucide-react";

const statusStyles = {
  "Pending Assignment": "bg-gray-100 text-gray-500",
  "In Progress": "bg-blue-50 text-blue-600",
  "Pending Approval": "bg-amber-50 text-amber-600",
  "Report Ready": "bg-green-50 text-green-600",
};

export default function LabReportModal({ request, onClose, onApprove }) {
  const [summary, setSummary] = useState(request.resultSummary || "");

  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <FlaskConical size={18} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">{request.testName}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{request.patient} • {request.id}</p>

        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-4 ${statusStyles[request.status]}`}>
          {request.status}
        </span>

        <div className="space-y-2 text-sm mb-4">
          <p><span className="text-gray-400">Requested By:</span> {request.requestedBy}</p>
          <p><span className="text-gray-400">Normal Range:</span> {request.normalRange}</p>
          <p><span className="text-gray-400">Requested On:</span> {request.requestedOn}</p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Result Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            disabled={request.status === "Report Ready"}
            placeholder="Enter result findings..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 disabled:bg-gray-50"
          />
        </div>

        {request.status === "Pending Approval" ? (
          <button
            onClick={() => { onApprove(request, summary); onClose(); }}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Approve & Release Report
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}