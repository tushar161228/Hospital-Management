import LiveClock from "../components/doctor-dashboard/LiveClock";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import DoctorStatCard from "../components/doctor-dashboard/DoctorStatCard";
import TodaysSchedule from "../components/doctor-dashboard/TodaysSchedule";
import PatientQueue from "../components/doctor-dashboard/PatientQueue";
import PatientOverview from "../components/doctor-dashboard/PatientOverview";
import UpcomingAppointments from "../components/doctor-dashboard/UpcomingAppointments";
import RecentPrescriptions from "../components/doctor-dashboard/RecentPrescriptions";
import DoctorNotifications from "../components/doctor-dashboard/DoctorNotifications";
import AvailabilityTracker from "../components/doctor-dashboard/AvailabilityTracker";
import DoctorQuickActions from "../components/doctor-dashboard/DoctorQuickActions";
import { doctorStats } from "../data/doctorDashboardData";

export default function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const handleStatLinkClick = (link) => {
    const messages = {
      queue: "Scrolling to Patient Queue",
      prescriptions: "This would navigate to the full Prescriptions list",
      lab: "This would navigate to the full Lab Orders list",
      radiology: "This would navigate to the full Radiology Orders list",
    };
    alert(messages[link] || "This would open the relevant page");
  };

  const handleQuickAction = (action) => {
    const messages = {
      "new-consultation": "New Consultation form would open here",
      "add-prescription": "Add Prescription form would open here",
      "order-lab": "Order Lab Test form would open here",
      "order-radiology": "Order Radiology form would open here",
      "medical-certificate": "Medical Certificate form would open here",
      "refer-patient": "Refer Patient form would open here",
      "add-note": "Add Note panel would open here",
    };
    alert(messages[action] || action);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />

      <div className="flex-1 min-w-0">
        <DoctorTopbar />

        <main className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning, {user?.name || "Doctor"} 👋
              </h1>
              <p className="text-gray-600 mt-1">Here's what's happening in your clinic today.</p>
            </div>
            <LiveClock />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            {doctorStats.map((stat) => (
              <DoctorStatCard key={stat.label} {...stat} onLinkClick={handleStatLinkClick} />
            ))}
          </div>

          {/* Middle row: Schedule / Queue / Patient Overview + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6 items-start">
            <div className="lg:col-span-1">
              <TodaysSchedule />
            </div>
            <div className="lg:col-span-1">
              <PatientQueue />
            </div>
            <div className="lg:col-span-1 space-y-5">
              <PatientOverview />
              <DoctorNotifications />
            </div>
          </div>

          {/* Bottom row: Upcoming Appointments / Recent Prescriptions / Availability */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6 items-start">
            <div className="lg:col-span-1">
              <UpcomingAppointments />
            </div>
            <div className="lg:col-span-1">
              <RecentPrescriptions />
            </div>
            <div className="lg:col-span-1">
              <AvailabilityTracker />
            </div>
          </div>

          {/* Quick Actions */}
          <DoctorQuickActions onAction={handleQuickAction} />
        </main>
      </div>
    </div>
  );
}