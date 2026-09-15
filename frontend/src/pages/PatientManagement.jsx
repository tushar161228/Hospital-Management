import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import PatientFilters from "../components/patient-management/PatientFilters";
import PatientTable from "../components/patient-management/PatientTable";
import PatientFormModal from "../components/patient-management/PatientFormModal";
import PatientViewModal from "../components/patient-management/PatientViewModal";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  togglePatientStatus,
} from "../api/patientApi";

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [formModal, setFormModal] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const fetchPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesDept = !department || p.department === department;
    const matchesStatus = !status || p.status === status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSavePatient = async (patientData) => {
    try {
      if (patientData._id) {
        const res = await updatePatient(patientData._id, patientData);
        setPatients((prev) =>
          prev.map((p) => (p._id === res.data._id ? res.data : p)),
        );
      } else {
        const res = await createPatient(patientData);
        setPatients((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save patient");
    }
  };

  const handleToggleStatus = async (patient) => {
    try {
      const res = await togglePatientStatus(patient._id);
      setPatients((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p)),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (patient) => {
    if (confirm(`Delete ${patient.name}'s profile? This cannot be undone.`)) {
      try {
        await deletePatient(patient._id);
        setPatients((prev) => prev.filter((p) => p._id !== patient._id));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete patient");
      }
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

          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
              Loading patients...
            </div>
          ) : (
            <PatientTable
              patients={filteredPatients}
              onView={setViewPatient}
              onEdit={(p) => setFormModal({ mode: "edit", patient: p })}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onViewRecords={handleViewRecords}
            />
          )}
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
