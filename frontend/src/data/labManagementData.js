import { initialPatients } from "./patientManagementData";
import { initialStaff } from "./staffManagementData";

export const labTestCategories = ["Hematology", "Biochemistry", "Microbiology", "Pathology", "Radiology-linked"];

export const initialLabRequests = [
  {
    id: "LAB-7001",
    testName: "Complete Blood Count (CBC)",
    category: "Hematology",
    patient: "Amit Verma",
    patientId: "PAT-2001",
    requestedBy: "Dr. Rajesh Sharma",
    assignedTech: "Ravi Verma",
    price: 350,
    normalRange: "4.5-11.0 x10^9/L (WBC)",
    status: "Report Ready",
    requestedOn: "27 May 2026",
    resultSummary: "All parameters within normal range.",
  },
  {
    id: "LAB-7002",
    testName: "Lipid Profile",
    category: "Biochemistry",
    patient: "Neha Singh",
    patientId: "PAT-2002",
    requestedBy: "Dr. Priya Patel",
    assignedTech: "Ravi Verma",
    price: 600,
    normalRange: "LDL < 100 mg/dL",
    status: "In Progress",
    requestedOn: "27 May 2026",
    resultSummary: null,
  },
  {
    id: "LAB-7003",
    testName: "Urine Culture",
    category: "Microbiology",
    patient: "Suresh Kumar",
    patientId: "PAT-2003",
    requestedBy: "Dr. Amit Kumar",
    assignedTech: "Unassigned",
    price: 450,
    normalRange: "No growth",
    status: "Pending Assignment",
    requestedOn: "27 May 2026",
    resultSummary: null,
  },
  {
    id: "LAB-7004",
    testName: "Biopsy Analysis",
    category: "Pathology",
    patient: "Anjali Mehta",
    patientId: "PAT-2004",
    requestedBy: "Dr. Neha Gupta",
    assignedTech: "Ravi Verma",
    price: 1800,
    normalRange: "Benign tissue expected",
    status: "Pending Approval",
    requestedOn: "26 May 2026",
    resultSummary: "No malignancy detected — awaiting pathologist sign-off.",
  },
];

export function generateLabId(existing) {
  const nums = existing.map((l) => parseInt(l.id.split("-")[1], 10));
  const next = Math.max(...nums, 7000) + 1;
  return `LAB-${next}`;
}

export function getLabTechnicians() {
  return initialStaff.filter((s) => s.role === "Lab Technician");
}

export { initialPatients };