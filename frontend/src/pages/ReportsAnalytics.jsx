import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ReportTabs from "../components/reports-analytics/ReportTabs";
import DoctorPerformanceReport from "../components/reports-analytics/DoctorPerformanceReport";
import AppointmentReport from "../components/reports-analytics/AppointmentReport";
import RevenueReport from "../components/reports-analytics/RevenueReport";
import PrescriptionReport from "../components/reports-analytics/PrescriptionReport";

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("doctors");
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Reports & Analytics</p>
          </div>

          <ReportTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "doctors" && <DoctorPerformanceReport />}
          {activeTab === "appointments" && <AppointmentReport />}
          {activeTab === "revenue" && <RevenueReport />}
          {activeTab === "prescriptions" && <PrescriptionReport />}
        </main>
      </div>
    </div>
  );
}