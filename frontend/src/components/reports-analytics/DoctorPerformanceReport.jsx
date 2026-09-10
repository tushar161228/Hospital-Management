import { Star, Download } from "lucide-react";
import { getDoctorPerformance } from "../../data/reportsAnalyticsData";

export default function DoctorPerformanceReport() {
  const data = getDoctorPerformance();

  const handleExport = () => {
    const rows = [
      ["Doctor", "Department", "Total Appointments", "Completed", "Revenue", "Rating"],
      ...data.map((d) => [d.name, d.department, d.totalAppointments, d.completed, d.revenue, d.rating]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "doctor-performance-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Doctor Performance</h3>
        <button onClick={handleExport} className="flex items-center gap-1.5 text-sm text-blue-700 hover:underline">
          <Download size={14} /> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Doctor</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Appointments</th>
              <th className="px-4 py-3 font-medium">Completed</th>
              <th className="px-4 py-3 font-medium">Revenue</th>
              <th className="px-4 py-3 font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.name} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-800">{d.name}</td>
                <td className="px-4 py-3 text-gray-600">{d.department}</td>
                <td className="px-4 py-3 text-gray-600">{d.totalAppointments}</td>
                <td className="px-4 py-3 text-gray-600">{d.completed}</td>
                <td className="px-4 py-3 text-gray-800">₹{d.revenue.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star size={13} fill="currentColor" /> {d.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}