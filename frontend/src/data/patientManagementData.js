export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["Male", "Female", "Other"];

export const initialPatients = [
  {
    id: "PAT-2001",
    name: "Amit Verma",
    age: 45,
    gender: "Male",
    phone: "+91 91234 56780",
    email: "amit.verma@example.com",
    address: "12 MG Road, Delhi",
    bloodGroup: "B+",
    assignedDoctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    registeredOn: "12 Jan 2025",
    lastVisit: "27 May 2026",
    status: "Active",
  },
  {
    id: "PAT-2002",
    name: "Neha Singh",
    age: 32,
    gender: "Female",
    phone: "+91 91234 56781",
    email: "neha.singh@example.com",
    address: "45 Park Street, Delhi",
    bloodGroup: "O+",
    assignedDoctor: "Dr. Priya Patel",
    department: "Dermatology",
    registeredOn: "03 Mar 2025",
    lastVisit: "27 May 2026",
    status: "Active",
  },
  {
    id: "PAT-2003",
    name: "Suresh Kumar",
    age: 58,
    gender: "Male",
    phone: "+91 91234 56782",
    email: "suresh.kumar@example.com",
    address: "9 Lake View, Gurgaon",
    bloodGroup: "A+",
    assignedDoctor: "Dr. Amit Kumar",
    department: "Orthopedics",
    registeredOn: "20 Apr 2026",
    lastVisit: "27 May 2026",
    status: "Active",
  },
  {
    id: "PAT-2004",
    name: "Anjali Mehta",
    age: 27,
    gender: "Female",
    phone: "+91 91234 56783",
    email: "anjali.mehta@example.com",
    address: "78 Civil Lines, Delhi",
    bloodGroup: "AB+",
    assignedDoctor: "Dr. Neha Gupta",
    department: "Gynecology",
    registeredOn: "15 Feb 2025",
    lastVisit: "20 May 2026",
    status: "Inactive",
  },
];

export function generatePatientId(existingPatients) {
  const nums = existingPatients.map((p) => parseInt(p.id.split("-")[1], 10));
  const next = Math.max(...nums, 2000) + 1;
  return `PAT-${next}`;
}
