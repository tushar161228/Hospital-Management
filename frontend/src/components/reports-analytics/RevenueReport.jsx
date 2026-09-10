import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getRevenueByDepartment } from "../../data/reportsAnalyticsData";

const colors = ["#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#22c55e", "#f59e0b"];

export default function RevenueReport() {
  const byDept = getRevenueByDepartment();
  const chartData = Object.entries(byDept).map(([name, value]) => ({ name, value }));
  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Revenue by Department</h3>
        <span className="text-sm font-semibold text-gray-800">₹{total.toLocaleString("en-IN")}</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}