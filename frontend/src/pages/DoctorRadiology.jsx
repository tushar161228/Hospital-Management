import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import NewRadiologyOrderForm from "../components/doctor-radiology/NewRadiologyOrderForm";
import DoctorRadiologyOrderList from "../components/doctor-radiology/DoctorRadiologyOrderList";
import { initialRadiologyRequests } from "../data/radiologyManagementData";
import { initialPatients } from "../data/patientManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorRadiology() {
  const myPatients = initialPatients.filter((p) => p.assignedDoctor === doctorProfile.name);
  const [requests, setRequests] = useState(
    initialRadiologyRequests.filter((r) => r.requestedBy === doctorProfile.name)
  );

  const handleSave = (req) => setRequests((prev) => [req, ...prev]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Radiology</h1>
            <p className="text-gray-500 mt-1">Order and track radiology tests for your patients.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <NewRadiologyOrderForm patients={myPatients} existingRequests={requests} onSave={handleSave} />
            <DoctorRadiologyOrderList requests={requests} />
          </div>
        </main>
      </div>
    </div>
  );
}