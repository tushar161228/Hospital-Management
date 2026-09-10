export const systemRoles = ["Super Admin", "Doctor", "Receptionist", "Pharmacist", "Lab Technician", "Billing Executive"];

export const initialUsers = [
  {
    id: "USR-001",
    name: "Admin User",
    email: "admin@sutrasync.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "27 May 2026, 09:12 AM",
    twoFactorEnabled: true,
  },
  {
    id: "USR-002",
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@sutrasync.com",
    role: "Doctor",
    status: "Active",
    lastLogin: "27 May 2026, 08:55 AM",
    twoFactorEnabled: true,
  },
  {
    id: "USR-003",
    name: "Neha Singh",
    email: "neha.r@sutrasync.com",
    role: "Receptionist",
    status: "Active",
    lastLogin: "27 May 2026, 08:40 AM",
    twoFactorEnabled: false,
  },
  {
    id: "USR-004",
    name: "Pooja Nair",
    email: "pooja.n@sutrasync.com",
    role: "Pharmacist",
    status: "Inactive",
    lastLogin: "18 Mar 2026, 03:20 PM",
    twoFactorEnabled: false,
  },
];

export function generateUserId(existing) {
  const nums = existing.map((u) => parseInt(u.id.split("-")[1], 10));
  const next = Math.max(...nums, 0) + 1;
  return `USR-${String(next).padStart(3, "0")}`;
}