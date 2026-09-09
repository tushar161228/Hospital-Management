export const staffRoles = ["Receptionist", "Nurse", "Lab Technician", "Pharmacist", "Billing Executive"];

export const initialStaff = [
  {
    id: "STF-5001",
    empId: "EMP-6001",
    name: "Neha Singh",
    role: "Receptionist",
    email: "neha.r@sutrasync.com",
    phone: "+91 90123 45671",
    branch: "Main Branch - Sector 12",
    joinedOn: "10 Jun 2025",
    status: "Active",
  },
  {
    id: "STF-5002",
    empId: "EMP-6002",
    name: "Meena Patel",
    role: "Nurse",
    email: "meena.p@sutrasync.com",
    phone: "+91 90123 45672",
    branch: "Main Branch - Sector 12",
    joinedOn: "22 Aug 2025",
    status: "Active",
  },
  {
    id: "STF-5003",
    empId: "EMP-6003",
    name: "Ravi Verma",
    role: "Lab Technician",
    email: "ravi.v@sutrasync.com",
    phone: "+91 90123 45673",
    branch: "City Branch - MG Road",
    joinedOn: "05 Jan 2026",
    status: "Active",
  },
  {
    id: "STF-5004",
    empId: "EMP-6004",
    name: "Pooja Nair",
    role: "Pharmacist",
    email: "pooja.n@sutrasync.com",
    phone: "+91 90123 45674",
    branch: "Main Branch - Sector 12",
    joinedOn: "18 Mar 2025",
    status: "Inactive",
  },
  {
    id: "STF-5005",
    empId: "EMP-6005",
    name: "Karan Malhotra",
    role: "Billing Executive",
    email: "karan.m@sutrasync.com",
    phone: "+91 90123 45675",
    branch: "City Branch - MG Road",
    joinedOn: "30 Sep 2025",
    status: "Active",
  },
];

export function generateStaffId(existing) {
  const nums = existing.map((s) => parseInt(s.id.split("-")[1], 10));
  const next = Math.max(...nums, 5000) + 1;
  return `STF-${next}`;
}

export function generateStaffEmpId(existing) {
  const nums = existing.map((s) => parseInt(s.empId.split("-")[1], 10));
  const next = Math.max(...nums, 6000) + 1;
  return `EMP-${next}`;
}