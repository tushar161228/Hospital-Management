import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import PatientFilters from "../components/patient-management/PatientFilters";
import PatientTable from "../components/patient-management/PatientTable";
import PatientFormModal from "../components/patient-management/PatientFormModal";
import PatientViewModal from "../components/patient-management/PatientViewModal";
import { initialPatients } from "../data/patientManagementData";

export default function PatientManagement() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [formModal, setFormModal] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesDept = !department || p.department === department;
    const matchesStatus = !status || p.status === status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSavePatient = (patientData) => {
    setPatients((prev) => {
      const exists = prev.some((p) => p.id === patientData.id);
      return exists
        ? prev.map((p) => (p.id === patientData.id ? patientData : p))
        : [...prev, patientData];
    });
  };

  const handleToggleStatus = (patient) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p,
      ),
    );
  };

  const handleDelete = (patient) => {
    if (confirm(`Delete ${patient.name}'s profile? This cannot be undone.`)) {
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
    }
  };

  const handleViewRecords = (patient) => {
    alert(`Full medical records / EHR for ${patient.name} would open here`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Patient Management
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Home &gt; Patient Management
            </p>
          </div>

          <PatientFilters
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            status={status}
            onStatusChange={setStatus}
            onAddPatient={() => setFormModal({ mode: "add", patient: null })}
          />

          <PatientTable
            patients={filteredPatients}
            onView={setViewPatient}
            onEdit={(p) => setFormModal({ mode: "edit", patient: p })}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onViewRecords={handleViewRecords}
          />
        </main>
      </div>

      {formModal && (
        <PatientFormModal
          mode={formModal.mode}
          patient={formModal.patient}
          existingPatients={patients}
          onClose={() => setFormModal(null)}
          onSave={handleSavePatient}
        />
      )}

      {viewPatient && (
        <PatientViewModal
          patient={viewPatient}
          onClose={() => setViewPatient(null)}
        />
      )}
    </div>
  );
}
