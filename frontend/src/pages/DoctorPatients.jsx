import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import DoctorPatientFilters from "../components/doctor-patients/DoctorPatientFilters";
import DoctorPatientCard from "../components/doctor-patients/DoctorPatientCard";
import PatientViewModal from "../components/patient-management/PatientViewModal";
import { initialPatients } from "../data/patientManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorPatients() {
  const [search, setSearch] = useState("");
  const [viewPatient, setViewPatient] = useState(null);

  const myPatients = initialPatients.filter((p) => p.assignedDoctor === doctorProfile.name);

  const filtered = myPatients.filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
            <p className="text-gray-500 mt-1">{myPatients.length} patients under your care.</p>
          </div>

          <DoctorPatientFilters search={search} onSearchChange={setSearch} />

          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
              No patients found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <DoctorPatientCard key={p.id} patient={p} onViewHistory={setViewPatient} />
              ))}
            </div>
          )}
        </main>
      </div>

      {viewPatient && (
        <PatientViewModal patient={viewPatient} onClose={() => setViewPatient(null)} />
      )}
    </div>
  );
}