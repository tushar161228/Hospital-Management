import { Eye, Pill } from "lucide-react";

const statusStyles = {
  Signed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Draft: "bg-gray-100 text-gray-500",
};

export default function PrescriptionTable({ prescriptions, onView }) {
  if (prescriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No prescriptions match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Prescription ID</th>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Doctor</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Medicines</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((rx) => (
              <tr key={rx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{rx.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{rx.patient}</td>
                <td className="px-4 py-3 text-gray-600">{rx.doctor}</td>
                <td className="px-4 py-3 text-gray-600">{rx.date}</td>
                <td className="px-4 py-3 text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Pill size={13} className="text-gray-400" />
                    {rx.medicines.length} item{rx.medicines.length !== 1 ? "s" : ""}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[rx.status]}`}>
                    {rx.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onView(rx)} className="text-blue-700 hover:text-blue-800">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}