import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import LeaveApplyForm from "../components/doctor-leave/LeaveApplyForm";
import MyLeaveList from "../components/doctor-leave/MyLeaveList";
import { initialLeaveRequests } from "../data/scheduleManagementData";
import { doctorProfile } from "../data/doctorDashboardData";

export default function DoctorLeave() {
  const [requests, setRequests] = useState(
    initialLeaveRequests.filter((lv) => lv.personName === doctorProfile.name)
  );

  const handleSave = (req) => setRequests((prev) => [req, ...prev]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Leave</h1>
            <p className="text-gray-500 mt-1">Apply for leave and track your requests.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <LeaveApplyForm existingRequests={requests} onSave={handleSave} />
            <MyLeaveList requests={requests} />
          </div>
        </main>
      </div>
    </div>
  );
}