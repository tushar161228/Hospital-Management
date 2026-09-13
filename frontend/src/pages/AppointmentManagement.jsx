import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import AppointmentFilters from "../components/appointment-management/AppointmentFilters";
import AppointmentTable from "../components/appointment-management/AppointmentTable";
import AppointmentFormModal from "../components/appointment-management/AppointmentFormModal";
import CancelReasonModal from "../components/appointment-management/CancelReasonModal";
import { initialAppointments, initialDoctors } from "../data/appointmentManagementData";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  useEffect(() => {
    if (location.state?.openAdd) {
      setFormOpen(true);
    }
  }, [location.state]);

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      !search ||
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !department || a.department === department;
    const matchesStatus = !status || a.status === status;
    const matchesDate = !date || a.date === new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    return matchesSearch && matchesDept && matchesStatus && matchesDate;
  });

  const handleSaveAppointment = (appt) => {
    setAppointments((prev) => [...prev, appt]);
  };

  const handleApprove = (appt) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appt.id ? { ...a, status: "Confirmed" } : a))
    );
  };

  const handleReschedule = (appt) => {
    const newDate = prompt(`Reschedule ${appt.patient}'s appointment.\nEnter new date (e.g. 28 May 2026):`, appt.date);
    if (!newDate) return;
    const newTime = prompt("Enter new time (e.g. 11:00 AM):", appt.time);
    if (!newTime) return;
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appt.id ? { ...a, date: newDate, time: newTime, status: "Rescheduled" } : a
      )
    );
    alert("Patient and doctor would be notified of the new schedule.");
  };

  const handleReassign = (appt) => {
    const options = initialDoctors.map((d) => `${d.name} (${d.department})`).join("\n");
    const choice = prompt(`Reassign ${appt.patient}'s appointment to:\n${options}\n\nType exact doctor name:`, appt.doctor);
    if (!choice) return;
    const newDoc = initialDoctors.find((d) => choice.includes(d.name));
    if (!newDoc) {
      alert("Doctor not found — no changes made.");
      return;
    }
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appt.id ? { ...a, doctor: newDoc.name, department: newDoc.department } : a
      )
    );
  };

  const handleCancelConfirm = (appt, reason) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appt.id ? { ...a, status: "Cancelled", cancelReason: reason } : a
      )
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Appointments</p>
          </div>

          <AppointmentFilters
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            status={status}
            onStatusChange={setStatus}
            date={date}
            onDateChange={setDate}
            onAddAppointment={() => setFormOpen(true)}
          />

          <AppointmentTable
            appointments={filtered}
            onApprove={handleApprove}
            onCancel={setCancelTarget}
            onReschedule={handleReschedule}
            onReassign={handleReassign}
          />
        </main>
      </div>

      {formOpen && (
        <AppointmentFormModal
          existingAppointments={appointments}
          onClose={() => setFormOpen(false)}
          onSave={handleSaveAppointment}
        />
      )}

      {cancelTarget && (
        <CancelReasonModal
          appointment={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleCancelConfirm}
        />
      )}
    </div>
  );
}