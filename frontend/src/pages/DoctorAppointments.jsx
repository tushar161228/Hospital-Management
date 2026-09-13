import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import DoctorAppointmentFilters from "../components/doctor-appointments/DoctorAppointmentFilters";
import DoctorAppointmentTable from "../components/doctor-appointments/DoctorAppointmentTable";
import ConsultationNoteModal from "../components/doctor-appointments/ConsultationNoteModal";
import { initialAppointments } from "../data/appointmentManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState(
    initialAppointments.filter((a) => a.doctor === doctorProfile.name)
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [noteTarget, setNoteTarget] = useState(null);

  const filtered = appointments.filter((a) => {
    const matchesSearch = !search || a.patient.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || a.status === status;
    const matchesDate = !date || a.date === new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleComplete = (appt) => {
    setAppointments((prev) => prev.map((a) => (a.id === appt.id ? { ...a, status: "Completed" } : a)));
  };

  const handleSaveNote = (appt, note) => {
    setAppointments((prev) => prev.map((a) => (a.id === appt.id ? { ...a, consultationNote: note } : a)));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
            <p className="text-gray-500 mt-1">All appointments assigned to you.</p>
          </div>

          <DoctorAppointmentFilters
            search={search} onSearchChange={setSearch}
            status={status} onStatusChange={setStatus}
            date={date} onDateChange={setDate}
          />

          <DoctorAppointmentTable
            appointments={filtered}
            onComplete={handleComplete}
            onAddNote={setNoteTarget}
          />
        </main>
      </div>

      {noteTarget && (
        <ConsultationNoteModal appointment={noteTarget} onClose={() => setNoteTarget(null)} onSave={handleSaveNote} />
      )}
    </div>
  );
}