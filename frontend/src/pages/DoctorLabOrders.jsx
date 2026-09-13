import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import NewLabOrderForm from "../components/doctor-lab/NewLabOrderForm";
import DoctorLabOrderList from "../components/doctor-lab/DoctorLabOrderList";
import { initialLabRequests } from "../data/labManagementData";
import { initialPatients } from "../data/patientManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorLabOrders() {
  const myPatients = initialPatients.filter((p) => p.assignedDoctor === doctorProfile.name);
  const [requests, setRequests] = useState(
    initialLabRequests.filter((r) => r.requestedBy === doctorProfile.name)
  );

  const handleSave = (req) => setRequests((prev) => [req, ...prev]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Lab Orders</h1>
            <p className="text-gray-500 mt-1">Order and track lab tests for your patients.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <NewLabOrderForm patients={myPatients} existingRequests={requests} onSave={handleSave} />
            <DoctorLabOrderList requests={requests} />
          </div>
        </main>
      </div>
    </div>
  );
}