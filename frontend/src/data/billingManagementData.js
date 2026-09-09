import { initialPatients } from "./patientManagementData";
import { initialDoctors } from "./doctorManagementData";

export const paymentModes = ["Cash", "Card", "UPI", "Online", "Insurance"];
export const invoiceStatuses = [
  "Paid",
  "Pending",
  "Partially Paid",
  "Refunded",
];

export const initialInvoices = [
  {
    id: "INV-1256",
    patient: "Amit Verma",
    patientId: "PAT-2001",
    doctor: "Dr. Rajesh Sharma",
    date: "27 May 2026",
    items: [
      { label: "Consultation Fee", amount: 800 },
      { label: "ECG Test", amount: 450 },
    ],
    total: 1250,
    paidAmount: 1250,
    paymentMode: "UPI",
    status: "Paid",
    insuranceClaim: null,
  },
  {
    id: "INV-1257",
    patient: "Neha Singh",
    patientId: "PAT-2002",
    doctor: "Dr. Priya Patel",
    date: "27 May 2026",
    items: [
      { label: "Consultation Fee", amount: 600 },
      { label: "Skin Biopsy", amount: 1200 },
    ],
    total: 1800,
    paidAmount: 900,
    paymentMode: "Card",
    status: "Partially Paid",
    insuranceClaim: null,
  },
  {
    id: "INV-1258",
    patient: "Suresh Kumar",
    patientId: "PAT-2003",
    doctor: "Dr. Amit Kumar",
    date: "27 May 2026",
    items: [
      { label: "Consultation Fee", amount: 900 },
      { label: "X-Ray (Knee)", amount: 700 },
      { label: "Physiotherapy Session", amount: 500 },
    ],
    total: 2100,
    paidAmount: 0,
    paymentMode: null,
    status: "Pending",
    insuranceClaim: {
      provider: "Star Health",
      claimId: "CLM-88213",
      status: "Under Review",
    },
  },
  {
    id: "INV-1259",
    patient: "Anjali Mehta",
    patientId: "PAT-2004",
    doctor: "Dr. Neha Gupta",
    date: "26 May 2026",
    items: [{ label: "Consultation Fee", amount: 700 }],
    total: 700,
    paidAmount: 700,
    paymentMode: "Cash",
    status: "Refunded",
    insuranceClaim: null,
  },
];

export function generateInvoiceId(existing) {
  const nums = existing.map((i) => parseInt(i.id.split("-")[1], 10));
  const next = Math.max(...nums, 1250) + 1;
  return `INV-${next}`;
}

export { initialPatients, initialDoctors };
