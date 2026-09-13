import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import NewPrescriptionForm from "../components/doctor-prescriptions/NewPrescriptionForm";
import DoctorPrescriptionList from "../components/doctor-prescriptions/DoctorPrescriptionList";
import { initialPrescriptions } from "../data/prescriptionManagementData";
import { initialPatients } from "../data/patientManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorPrescriptions() {
  const myPatients = initialPatients.filter((p) => p.assignedDoctor === doctorProfile.name);
  const [prescriptions, setPrescriptions] = useState(
    initialPrescriptions.filter((rx) => rx.doctor === doctorProfile.name)
  );

  const handleSave = (rx) => {
    setPrescriptions((prev) => [rx, ...prev]);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
            <p className="text-gray-500 mt-1">Write and review prescriptions for your patients.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <NewPrescriptionForm patients={myPatients} existingPrescriptions={prescriptions} onSave={handleSave} />
            <DoctorPrescriptionList prescriptions={prescriptions} />
          </div>
        </main>
      </div>
    </div>
  );
}