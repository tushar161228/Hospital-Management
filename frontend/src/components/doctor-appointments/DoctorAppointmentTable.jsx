import { AlertTriangle, CheckCircle2, FileEdit } from "lucide-react";

const statusStyles = {
  "Pending Approval": "bg-amber-50 text-amber-600",
  Confirmed: "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-600",
  Rescheduled: "bg-purple-50 text-purple-600",
};

export default function DoctorAppointmentTable({ appointments, onComplete, onAddNote }) {
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
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Date / Time</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${a.isEmergency ? "bg-red-50/30" : ""}`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 flex items-center gap-1.5">
                    {a.isEmergency && <AlertTriangle size={13} className="text-red-500 shrink-0" />}
                    {a.patient}
                  </p>
                  <p className="text-xs text-gray-400">{a.patientId}</p>
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
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {a.status === "Confirmed" && (
                      <button
                        onClick={() => onComplete(a)}
                        className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                      >
                        <CheckCircle2 size={13} /> Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => onAddNote(a)}
                      className="flex items-center gap-1 text-xs text-blue-700 hover:underline"
                    >
                      <FileEdit size={13} /> Note
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}