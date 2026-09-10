import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorManagement from "./pages/DoctorManagement";
import PatientManagement from "./pages/PatientManagement";
import AppointmentManagement from "./pages/AppointmentManagement";
import DepartmentManagement from "./pages/DepartmentManagement";
import StaffManagement from "./pages/StaffManagement";
import PharmacyManagement from "./pages/PharmacyManagement";
import BillingManagement from "./pages/BillingManagement";
import ScheduleManagement from "./pages/ScheduleManagement";
import LabManagement from "./pages/LabManagement";
import RadiologyManagement from "./pages/RadiologyManagement";
import PrescriptionManagement from "./pages/PrescriptionManagement";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import RolesPermissions from "./pages/RolesPermissions";
import SettingsPage from "./pages/SettingsPage";
import NotificationsManagement from "./pages/NotificationsManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctors" element={<DoctorManagement />} />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
        <Route path="/departments" element={<DepartmentManagement />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/billing" element={<BillingManagement />} />
        <Route path="/pharmacy" element={<PharmacyManagement />} />
        <Route path="/schedule" element={<ScheduleManagement />} />
        <Route path="/laboratory" element={<LabManagement />} />
        <Route path="/radiology" element={<RadiologyManagement />} />
        <Route path="/prescriptions" element={<PrescriptionManagement />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/roles" element={<RolesPermissions />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/communication" element={<NotificationsManagement />} />
      </Routes>
    </BrowserRouter>
  );
}