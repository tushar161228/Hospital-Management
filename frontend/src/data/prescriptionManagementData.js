import { initialPatients } from "./patientManagementData";
import { initialDoctors } from "./doctorManagementData";

export const initialPrescriptions = [
  {
    id: "RX-6001",
    patient: "Amit Verma",
    patientId: "PAT-2001",
    doctor: "Dr. Rajesh Sharma",
    date: "27 May 2026, 09:05 AM",
    status: "Signed",
    medicines: [
      { name: "Paracetamol 500mg", dosage: "1 tablet twice daily", duration: "5 days" },
      { name: "Amoxicillin 250mg", dosage: "1 capsule three times daily", duration: "7 days" },
    ],
    notes: "Take after meals. Follow up if fever persists beyond 3 days.",
  },
  {
    id: "RX-6002",
    patient: "Neha Singh",
    patientId: "PAT-2002",
    doctor: "Dr. Priya Patel",
    date: "27 May 2026, 09:35 AM",
    status: "Signed",
    medicines: [
      { name: "Cetirizine Syrup", dosage: "10ml once daily at night", duration: "10 days" },
      { name: "Betamethasone Cream", dosage: "Apply thin layer twice daily", duration: "14 days" },
    ],
    notes: "Avoid sun exposure on treated area.",
  },
  {
    id: "RX-6003",
    patient: "Ravi Sharma",
    patientId: "PAT-2006",
    doctor: "Dr. Rajesh Sharma",
    date: "27 May 2026, 09:50 AM",
    status: "Pending",
    medicines: [
      { name: "Insulin Glargine", dosage: "10 units subcutaneous at bedtime", duration: "Ongoing" },
    ],
    notes: "Monitor blood glucose levels twice daily.",
  },
  {
    id: "RX-6004",
    patient: "Suresh Kumar",
    patientId: "PAT-2003",
    doctor: "Dr. Amit Kumar",
    date: "27 May 2026, 10:05 AM",
    status: "Pending",
    medicines: [
      { name: "Paracetamol 500mg", dosage: "1 tablet as needed for pain", duration: "As needed" },
    ],
    notes: "For post-physiotherapy pain relief.",
  },
  {
    id: "RX-6005",
    patient: "Anjali Mehta",
    patientId: "PAT-2004",
    doctor: "Dr. Neha Gupta",
    date: "27 May 2026, 10:20 AM",
    status: "Draft",
    medicines: [],
    notes: "",
  },
];

export const medicineMaster = [
  { name: "Paracetamol 500mg", generic: "Acetaminophen", interactions: "Avoid with heavy alcohol use", dosageGuide: "500-1000mg every 4-6 hrs, max 4g/day" },
  { name: "Amoxicillin 250mg", generic: "Amoxicillin", interactions: "Reduced efficacy with oral contraceptives", dosageGuide: "250-500mg three times daily" },
  { name: "Cetirizine Syrup", generic: "Cetirizine HCl", interactions: "Avoid with CNS depressants", dosageGuide: "5-10mg once daily" },
  { name: "Insulin Glargine", generic: "Insulin Glargine", interactions: "Risk of hypoglycemia with other glucose-lowering agents", dosageGuide: "Individualized — subcutaneous once daily" },
  { name: "Betamethasone Cream", generic: "Betamethasone", interactions: "Avoid prolonged use on broken skin", dosageGuide: "Apply thin layer 1-2 times daily" },
];

export function generatePrescriptionId(existing) {
  const nums = existing.map((r) => parseInt(r.id.split("-")[1], 10));
  const next = Math.max(...nums, 6000) + 1;
  return `RX-${next}`;
}

export { initialPatients, initialDoctors };