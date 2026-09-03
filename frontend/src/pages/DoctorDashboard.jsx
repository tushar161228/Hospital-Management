import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";

export default function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />

      <div className="flex-1 min-w-0">
        <DoctorTopbar onMenuClick={() => setSidebarOpen((o) => !o)} />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, Dr. Rajesh Sharma 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening in your clinic today.
          </p>
          <p className="text-sm text-gray-400 mt-6">
            Remaining widgets (schedule, queue, prescriptions, etc.) will render
            here once built.
          </p>
        </main>
      </div>
    </div>
  );
}
