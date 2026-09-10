import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getAppointmentStats } from "../../data/reportsAnalyticsData";

const statusColors = {
  "Pending Approval": "#f59e0b",
  Confirmed: "#3b82f6",
  Completed: "#22c55e",
  Cancelled: "#ef4444",
  Rescheduled: "#a855f7",
};

export default function AppointmentReport() {
  const stats = getAppointmentStats();
  const chartData = Object.entries(stats).map(([status, count]) => ({ status, count }));
  const total = chartData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Appointment Statistics</h3>
        <span className="text-sm text-gray-500">Total: {total}</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="status" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={statusColors[entry.status] || "#94a3b8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
        {chartData.map((d) => (
          <div key={d.status} className="text-center">
            <p className="text-xs text-gray-500">{d.status}</p>
            <p className="text-lg font-bold" style={{ color: statusColors[d.status] }}>{d.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}