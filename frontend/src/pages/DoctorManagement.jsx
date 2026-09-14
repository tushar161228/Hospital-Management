import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DoctorFilters from "../components/doctor-management/DoctorFilters";
import DoctorTable from "../components/doctor-management/DoctorTable";
import DoctorFormModal from "../components/doctor-management/DoctorFormModal";
import DoctorViewModal from "../components/doctor-management/DoctorViewModal";
import {
  getDoctors, createDoctor, updateDoctor, deleteDoctor, toggleDoctorStatus,
} from "../api/doctorApi";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [formModal, setFormModal] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.doctorId.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !department || d.department === department;
    const matchesStatus = !status || d.status === status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSaveDoctor = async (doctorData) => {
    try {
      if (doctorData._id) {
        const res = await updateDoctor(doctorData._id, doctorData);
        setDoctors((prev) => prev.map((d) => (d._id === res.data._id ? res.data : d)));
      } else {
        const res = await createDoctor(doctorData);
        setDoctors((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save doctor");
    }
  };

  const handleToggleStatus = async (doc) => {
    try {
      const res = await toggleDoctorStatus(doc._id);
      setDoctors((prev) => prev.map((d) => (d._id === res.data._id ? res.data : d)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleResetPassword = (doc) => {
    const tempPassword = Math.random().toString(36).slice(-8);
    alert(`New temporary password for ${doc.name}: ${tempPassword}\n(Backend password-reset endpoint not yet built — this is a placeholder.)`);
  };

  const handleDelete = async (doc) => {
    if (confirm(`Delete ${doc.name}'s profile? This cannot be undone.`)) {
      try {
        await deleteDoctor(doc._id);
        setDoctors((prev) => prev.filter((d) => d._id !== doc._id));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete doctor");
      }
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

          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
              Loading doctors...
            </div>
          ) : (
            <DoctorTable
              doctors={filteredDoctors}
              onView={setViewDoctor}
              onEdit={(doc) => setFormModal({ mode: "edit", doctor: doc })}
              onToggleStatus={handleToggleStatus}
              onResetPassword={handleResetPassword}
              onDelete={handleDelete}
            />
          )}
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