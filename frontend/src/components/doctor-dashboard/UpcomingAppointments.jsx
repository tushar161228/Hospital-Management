import { upcomingAppointments } from "../../data/doctorDashboardData";

export default function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Upcoming Appointments</h3>
        <button
          onClick={() => alert("Full appointments list would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Patient</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Reason</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.map((a, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 text-gray-600">{a.time}</td>
                <td className="py-2.5 text-gray-800 font-medium">{a.patient}</td>
                <td className="py-2.5 text-gray-600">{a.type}</td>
                <td className="py-2.5 text-gray-600">{a.reason}</td>
                <td className="py-2.5">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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