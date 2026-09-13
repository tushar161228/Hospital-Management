import { useState } from "react";
import { Download, ChevronDown, Calendar } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import AppointmentsChart from "../components/dashboard/AppointmentsChart";
import RevenueChart from "../components/dashboard/RevenueChart";
import TodaysAppointments from "../components/dashboard/TodaysAppointments";
import DepartmentOverview from "../components/dashboard/DepartmentOverview";
import EmergencyCases from "../components/dashboard/EmergencyCases";
import RecentActivities from "../components/dashboard/RecentActivities";
import { statCards } from "../data/dashboardData";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleQuickAction = (action) => {
    const messages = {
      "add-doctor": "Add New Doctor form would open here",
      "book-appointment": "Book Appointment form would open here",
      "add-patient": "Add New Patient form would open here",
      "create-invoice": "Create Invoice form would open here",
    };
    alert(messages[action] || action);
  };

  const handleExportReport = () => {
    const headers = ["Metric", "Value", "Change"];
    const rows = statCards.map((c) => [c.label, c.value, c.change]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `sutrasync-dashboard-report-${formattedDate.replace(/\s/g, "-")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar onQuickAction={handleQuickAction} />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Home &gt; Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
                <Calendar size={15} />
                {formattedDate}
                <ChevronDown size={14} />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                />
              </div>
              <button
                onClick={handleExportReport}
                className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition"
              >
                <Download size={15} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <div className="lg:col-span-1">
              <AppointmentsChart />
            </div>
            <div className="lg:col-span-1">
              <RevenueChart />
            </div>
            <div className="lg:col-span-1">
              <EmergencyCases />
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-2">
              <TodaysAppointments />
            </div>
            <div className="lg:col-span-1">
              <DepartmentOverview />
            </div>
            <div className="lg:col-span-1">
              <RecentActivities />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
