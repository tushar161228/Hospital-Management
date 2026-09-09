import { initialDoctors } from "./doctorManagementData";
import { initialStaff } from "./staffManagementData";

export const leaveTypes = ["Sick Leave", "Casual Leave", "Emergency Leave", "Vacation"];
export const shifts = ["Morning (08:00 AM - 04:00 PM)", "Evening (04:00 PM - 12:00 AM)", "Night (12:00 AM - 08:00 AM)"];

export const initialLeaveRequests = [
  {
    id: "LV-9001",
    personName: "Dr. Priya Patel",
    personType: "Doctor",
    leaveType: "Sick Leave",
    fromDate: "29 May 2026",
    toDate: "30 May 2026",
    reason: "Fever and viral infection",
    status: "Pending",
    appliedOn: "27 May 2026",
  },
  {
    id: "LV-9002",
    personName: "Meena Patel",
    personType: "Staff",
    leaveType: "Casual Leave",
    fromDate: "02 Jun 2026",
    toDate: "02 Jun 2026",
    reason: "Personal work",
    status: "Approved",
    appliedOn: "25 May 2026",
  },
  {
    id: "LV-9003",
    personName: "Dr. Amit Kumar",
    personType: "Doctor",
    leaveType: "Vacation",
    fromDate: "10 Jun 2026",
    toDate: "17 Jun 2026",
    reason: "Family vacation",
    status: "Pending",
    appliedOn: "20 May 2026",
  },
  {
    id: "LV-9004",
    personName: "Ravi Verma",
    personType: "Staff",
    leaveType: "Emergency Leave",
    fromDate: "26 May 2026",
    toDate: "26 May 2026",
    reason: "Family emergency",
    status: "Rejected",
    appliedOn: "26 May 2026",
    rejectionReason: "Critical lab shift coverage unavailable",
  },
];

export const hospitalHolidays = [
  { date: "15 Aug 2026", name: "Independence Day" },
  { date: "02 Oct 2026", name: "Gandhi Jayanti" },
  { date: "12 Nov 2026", name: "Diwali" },
  { date: "25 Dec 2026", name: "Christmas" },
];

export function generateLeaveId(existing) {
  const nums = existing.map((l) => parseInt(l.id.split("-")[1], 10));
  const next = Math.max(...nums, 9000) + 1;
  return `LV-${next}`;
}

export function getAllPeople() {
  return [
    ...initialDoctors.map((d) => ({ name: d.name, type: "Doctor" })),
    ...initialStaff.map((s) => ({ name: s.name, type: "Staff" })),
  ];
}