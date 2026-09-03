import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import { revenueBreakdown } from "../../data/dashboardData";

const periods = ["This Month", "Last Month", "This Year"];

export default function RevenueChart() {
  const [period, setPeriod] = useState("This Month");
  const [open, setOpen] = useState(false);

  const total = revenueBreakdown.reduce((sum, r) => sum + r.value, 0);
  const totalLakh = (total / 100000).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600"
          >
            {period}
            <ChevronDown size={14} />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-500">Total Revenue</p>
        <p className="text-2xl font-bold text-gray-800">
          ₹{total.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-green-600 mt-0.5">↑ 18.6% vs last month</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueBreakdown}
                dataKey="value"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
              >
                {revenueBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-bold text-gray-800">
              {totalLakh}L
            </span>
            <span className="text-[10px] text-gray-400">Total</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          {revenueBreakdown.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-1.5 text-gray-600">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.name}
              </span>
              <span className="text-gray-800 font-medium">
                ₹{r.value.toLocaleString("en-IN")}{" "}
                <span className="text-gray-400">{r.percent}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
