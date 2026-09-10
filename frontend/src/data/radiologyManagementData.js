import { initialPatients } from "./patientManagementData";
import { initialDoctors } from "./doctorManagementData";

export const radiologyTestTypes = ["X-Ray", "MRI", "CT Scan", "Ultrasound"];

export const initialRadiologyRequests = [
  {
    id: "RAD-8001",
    testType: "X-Ray",
    bodyPart: "Knee (Left)",
    patient: "Suresh Kumar",
    patientId: "PAT-2003",
    requestedBy: "Dr. Amit Kumar",
    price: 700,
    status: "Report Ready",
    requestedOn: "27 May 2026",
    reportFileName: "xray-knee-suresh.pdf",
    findings: "Mild joint space narrowing, no fracture detected.",
  },
  {
    id: "RAD-8002",
    testType: "MRI",
    bodyPart: "Lumbar Spine",
    patient: "Anjali Mehta",
    patientId: "PAT-2004",
    requestedBy: "Dr. Neha Gupta",
    price: 4500,
    status: "In Progress",
    requestedOn: "27 May 2026",
    reportFileName: null,
    findings: null,
  },
  {
    id: "RAD-8003",
    testType: "CT Scan",
    bodyPart: "Chest",
    patient: "Amit Verma",
    patientId: "PAT-2001",
    requestedBy: "Dr. Rajesh Sharma",
    price: 3200,
    status: "Pending Upload",
    requestedOn: "27 May 2026",
    reportFileName: null,
    findings: null,
  },
  {
    id: "RAD-8004",
    testType: "Ultrasound",
    bodyPart: "Abdomen",
    patient: "Neha Singh",
    patientId: "PAT-2002",
    requestedBy: "Dr. Priya Patel",
    price: 1100,
    status: "Report Ready",
    requestedOn: "26 May 2026",
    reportFileName: "usg-abdomen-neha.pdf",
    findings: "No abnormality detected in liver, kidney, or gallbladder.",
  },
];

export function generateRadiologyId(existing) {
  const nums = existing.map((r) => parseInt(r.id.split("-")[1], 10));
  const next = Math.max(...nums, 8000) + 1;
  return `RAD-${next}`;
}

export { initialPatients, initialDoctors };