import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import PatientSelector from "../components/doctor-consultation/PatientSelector";
import VitalsForm from "../components/doctor-consultation/VitalsForm";
import ConsultationForm from "../components/doctor-consultation/ConsultationForm";
import { initialPatients } from "../data/patientManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorConsultation() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitals, setVitals] = useState({});
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const myPatients = initialPatients.filter((p) => p.assignedDoctor === doctorProfile.name);
  const filteredPatients = myPatients.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  const handleVitalsChange = (key, value) => {
    setVitals((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setVitals({});
    setDiagnosis("");
    setNotes("");
  };

  const handleComplete = () => {
    if (!selectedPatient) {
      alert("Please select a patient first");
      return;
    }
    alert(`Consultation for ${selectedPatient.name} completed and saved to their record.`);
    resetForm();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Consultation</h1>
            <p className="text-gray-500 mt-1">
              {selectedPatient ? `In consultation with ${selectedPatient.name}` : "Select a patient to begin."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1">
              <PatientSelector
                patients={filteredPatients}
                search={search}
                onSearchChange={setSearch}
                selectedPatient={selectedPatient}
                onSelect={setSelectedPatient}
              />
            </div>

            <div className="lg:col-span-2 space-y-5">
              {selectedPatient ? (
                <>
                  <VitalsForm vitals={vitals} onChange={handleVitalsChange} />
                  <ConsultationForm
                    diagnosis={diagnosis}
                    onDiagnosisChange={setDiagnosis}
                    notes={notes}
                    onNotesChange={setNotes}
                    onComplete={handleComplete}
                  />
                </>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
                  Select a patient from the left to start a consultation.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}