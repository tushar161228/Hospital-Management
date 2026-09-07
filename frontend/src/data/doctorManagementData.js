export const departments = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Gynecology",
];

export const branches = ["Main Branch - Sector 12", "City Branch - MG Road"];

export const initialDoctors = [
  {
    id: "DOC-1001",
    empId: "EMP-4501",
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@sutrasync.com",
    phone: "+91 98765 43210",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",
    qualification: "MBBS, MD, DM (Cardiology)",
    license: "MCI-45213",
    experience: 14,
    consultationFee: 800,
    branch: "Main Branch - Sector 12",
    room: "Cabin 204",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    workingHours: "09:00 AM - 05:00 PM",
    status: "Active",
    username: "rajesh.sharma",
  },
  {
    id: "DOC-1002",
    empId: "EMP-4502",
    name: "Dr. Priya Patel",
    email: "priya.patel@sutrasync.com",
    phone: "+91 98765 43211",
    department: "Dermatology",
    specialization: "Cosmetic Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    license: "MCI-45298",
    experience: 9,
    consultationFee: 600,
    branch: "Main Branch - Sector 12",
    room: "Cabin 108",
    workingDays: ["Mon", "Wed", "Fri"],
    workingHours: "10:00 AM - 04:00 PM",
    status: "Active",
    username: "priya.patel",
  },
  {
    id: "DOC-1003",
    empId: "EMP-4503",
    name: "Dr. Amit Kumar",
    email: "amit.kumar@sutrasync.com",
    phone: "+91 98765 43212",
    department: "Orthopedics",
    specialization: "Joint Replacement Surgeon",
    qualification: "MBBS, MS (Ortho)",
    license: "MCI-45177",
    experience: 18,
    consultationFee: 900,
    branch: "City Branch - MG Road",
    room: "Cabin 305",
    workingDays: ["Tue", "Thu", "Sat"],
    workingHours: "11:00 AM - 06:00 PM",
    status: "Inactive",
    username: "amit.kumar",
  },
  {
    id: "DOC-1004",
    empId: "EMP-4504",
    name: "Dr. Neha Gupta",
    email: "neha.gupta@sutrasync.com",
    phone: "+91 98765 43213",
    department: "Gynecology",
    specialization: "Obstetrician & Gynecologist",
    qualification: "MBBS, MD (OBG)",
    license: "MCI-45356",
    experience: 11,
    consultationFee: 700,
    branch: "Main Branch - Sector 12",
    room: "Cabin 210",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    workingHours: "09:00 AM - 03:00 PM",
    status: "Active",
    username: "neha.gupta",
  },
];

export function generateDoctorId(existingDoctors) {
  const nums = existingDoctors.map((d) => parseInt(d.id.split("-")[1], 10));
  const next = Math.max(...nums, 1000) + 1;
  return `DOC-${next}`;
}

export function generateEmployeeId(existingDoctors) {
  const nums = existingDoctors.map((d) => parseInt(d.empId.split("-")[1], 10));
  const next = Math.max(...nums, 4500) + 1;
  return `EMP-${next}`;
}

export function generateUsername(name) {
  return name.toLowerCase().replace("dr. ", "").replace(" ", ".");
}

export function generateTempPassword() {
  return Math.random().toString(36).slice(-8);
}