import { initialDoctors } from "./doctorManagementData";
import { initialPatients } from "./patientManagementData";

export const appointmentTypes = ["New Patient", "Follow Up", "Consultation", "Walk-in", "Emergency"];
export const appointmentStatuses = ["Pending Approval", "Confirmed", "Completed", "Cancelled", "Rescheduled"];

export const initialAppointments = [
  {
    id: "APT-3001",
    patient: "Amit Verma",
    patientId: "PAT-2001",
    doctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    date: "27 May 2026",
    time: "09:00 AM",
    type: "Follow Up",
    status: "Confirmed",
    isEmergency: false,
    cancelReason: null,
  },
  {
    id: "APT-3002",
    patient: "Neha Singh",
    patientId: "PAT-2002",
    doctor: "Dr. Priya Patel",
    department: "Dermatology",
    date: "27 May 2026",
    time: "09:30 AM",
    type: "Consultation",
    status: "Pending Approval",
    isEmergency: false,
    cancelReason: null,
  },
  {
    id: "APT-3003",
    patient: "Rajesh Malhotra",
    patientId: "PAT-2005",
    doctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    date: "27 May 2026",
    time: "10:15 AM",
    type: "Emergency",
    status: "Confirmed",
    isEmergency: true,
    cancelReason: null,
  },
  {
    id: "APT-3004",
    patient: "Suresh Kumar",
    patientId: "PAT-2003",
    doctor: "Dr. Amit Kumar",
    department: "Orthopedics",
    date: "27 May 2026",
    time: "10:00 AM",
    type: "New Patient",
    status: "Completed",
    isEmergency: false,
    cancelReason: null,
  },
  {
    id: "APT-3005",
    patient: "Anjali Mehta",
    patientId: "PAT-2004",
    doctor: "Dr. Neha Gupta",
    department: "Gynecology",
    date: "26 May 2026",
    time: "11:00 AM",
    type: "Follow Up",
    status: "Cancelled",
    isEmergency: false,
    cancelReason: "Patient requested reschedule due to travel",
  },
];

export function generateAppointmentId(existing) {
  const nums = existing.map((a) => parseInt(a.id.split("-")[1], 10));
  const next = Math.max(...nums, 3000) + 1;
  return `APT-${next}`;
}

export { initialDoctors, initialPatients };