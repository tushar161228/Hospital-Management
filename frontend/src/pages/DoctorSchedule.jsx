import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import WeeklyScheduleGrid from "../components/doctor-schedule/WeeklyScheduleGrid";
import ScheduleEditModal from "../components/doctor-schedule/ScheduleEditModal";

const initialSchedule = {
  Monday: { working: true, hours: "09:00 AM - 05:00 PM" },
  Tuesday: { working: true, hours: "09:00 AM - 05:00 PM" },
  Wednesday: { working: true, hours: "09:00 AM - 05:00 PM" },
  Thursday: { working: true, hours: "09:00 AM - 05:00 PM" },
  Friday: { working: true, hours: "09:00 AM - 05:00 PM" },
  Saturday: { working: false, hours: "" },
  Sunday: { working: false, hours: "" },
};

export default function DoctorSchedule() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [editingDay, setEditingDay] = useState(null);

  const handleSaveDay = (day, data) => {
    setSchedule((prev) => ({ ...prev, [day]: data }));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
            <p className="text-gray-500 mt-1">Your weekly working days and hours.</p>
          </div>

          <WeeklyScheduleGrid schedule={schedule} onEditDay={setEditingDay} />
        </main>
      </div>

      {editingDay && (
        <ScheduleEditModal
          day={editingDay}
          current={schedule[editingDay]}
          onClose={() => setEditingDay(null)}
          onSave={handleSaveDay}
        />
      )}
    </div>
  );
}