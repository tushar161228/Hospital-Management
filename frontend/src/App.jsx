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
      </Routes>
    </BrowserRouter>
  );
}