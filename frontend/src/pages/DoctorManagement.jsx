import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DoctorFilters from "../components/doctor-management/DoctorFilters";
import DoctorTable from "../components/doctor-management/DoctorTable";
import DoctorFormModal from "../components/doctor-management/DoctorFormModal";
import DoctorViewModal from "../components/doctor-management/DoctorViewModal";
import { initialDoctors } from "../data/doctorManagementData";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [formModal, setFormModal] = useState(null); // { mode: "add" | "edit", doctor }
  const [viewDoctor, setViewDoctor] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !department || d.department === department;
    const matchesStatus = !status || d.status === status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSaveDoctor = (doctorData) => {
    setDoctors((prev) => {
      const exists = prev.some((d) => d.id === doctorData.id);
      return exists
        ? prev.map((d) => (d.id === doctorData.id ? doctorData : d))
        : [...prev, doctorData];
    });
  };

  const handleToggleStatus = (doc) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d
      )
    );
  };

  const handleResetPassword = (doc) => {
    const tempPassword = Math.random().toString(36).slice(-8);
    alert(`New temporary password for ${doc.name}: ${tempPassword}\n(Share this securely with the doctor.)`);
  };

  const handleDelete = (doc) => {
    if (confirm(`Delete ${doc.name}'s profile? This cannot be undone.`)) {
      setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Doctor Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Doctor Management</p>
          </div>

          <DoctorFilters
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            status={status}
            onStatusChange={setStatus}
            onAddDoctor={() => setFormModal({ mode: "add", doctor: null })}
          />

          <DoctorTable
            doctors={filteredDoctors}
            onView={setViewDoctor}
            onEdit={(doc) => setFormModal({ mode: "edit", doctor: doc })}
            onToggleStatus={handleToggleStatus}
            onResetPassword={handleResetPassword}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {formModal && (
        <DoctorFormModal
          mode={formModal.mode}
          doctor={formModal.doctor}
          existingDoctors={doctors}
          onClose={() => setFormModal(null)}
          onSave={handleSaveDoctor}
        />
      )}

      {viewDoctor && (
        <DoctorViewModal doctor={viewDoctor} onClose={() => setViewDoctor(null)} />
      )}
    </div>
  );
}