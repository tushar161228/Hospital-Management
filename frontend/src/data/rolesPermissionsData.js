export const permissionModules = [
  "Dashboard", "Doctor Management", "Patient Management", "Appointments",
  "Staff Management", "Department", "Billing & Invoices", "Pharmacy",
  "Laboratory", "Radiology", "Schedule & Leave", "Prescriptions",
  "Reports & Analytics",
];

export const initialRoles = [
  {
    id: "ROLE-01",
    name: "Super Admin",
    description: "Full access across all modules — hospital-wide administrative control.",
    userCount: 1,
    permissions: Object.fromEntries(permissionModules.map((m) => [m, { view: true, edit: true, delete: true }])),
  },
  {
    id: "ROLE-02",
    name: "Doctor",
    description: "Clinical access — view patients, write prescriptions, order lab/radiology tests, view own reports.",
    userCount: 4,
    permissions: {
      "Dashboard": { view: true, edit: false, delete: false },
      "Doctor Management": { view: false, edit: false, delete: false },
      "Patient Management": { view: true, edit: true, delete: false },
      "Appointments": { view: true, edit: true, delete: false },
      "Staff Management": { view: false, edit: false, delete: false },
      "Department": { view: true, edit: false, delete: false },
      "Billing & Invoices": { view: false, edit: false, delete: false },
      "Pharmacy": { view: true, edit: false, delete: false },
      "Laboratory": { view: true, edit: true, delete: false },
      "Radiology": { view: true, edit: true, delete: false },
      "Schedule & Leave": { view: true, edit: true, delete: false },
      "Prescriptions": { view: true, edit: true, delete: false },
      "Reports & Analytics": { view: true, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-03",
    name: "Receptionist",
    description: "Front-desk access — patient registration, appointment booking, billing entry.",
    userCount: 2,
    permissions: {
      "Dashboard": { view: true, edit: false, delete: false },
      "Doctor Management": { view: true, edit: false, delete: false },
      "Patient Management": { view: true, edit: true, delete: false },
      "Appointments": { view: true, edit: true, delete: true },
      "Staff Management": { view: false, edit: false, delete: false },
      "Department": { view: true, edit: false, delete: false },
      "Billing & Invoices": { view: true, edit: true, delete: false },
      "Pharmacy": { view: false, edit: false, delete: false },
      "Laboratory": { view: false, edit: false, delete: false },
      "Radiology": { view: false, edit: false, delete: false },
      "Schedule & Leave": { view: true, edit: false, delete: false },
      "Prescriptions": { view: false, edit: false, delete: false },
      "Reports & Analytics": { view: false, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-04",
    name: "Pharmacist",
    description: "Pharmacy access — medicine stock, prescription fulfillment.",
    userCount: 1,
    permissions: {
      "Dashboard": { view: true, edit: false, delete: false },
      "Doctor Management": { view: false, edit: false, delete: false },
      "Patient Management": { view: true, edit: false, delete: false },
      "Appointments": { view: false, edit: false, delete: false },
      "Staff Management": { view: false, edit: false, delete: false },
      "Department": { view: false, edit: false, delete: false },
      "Billing & Invoices": { view: true, edit: false, delete: false },
      "Pharmacy": { view: true, edit: true, delete: true },
      "Laboratory": { view: false, edit: false, delete: false },
      "Radiology": { view: false, edit: false, delete: false },
      "Schedule & Leave": { view: true, edit: false, delete: false },
      "Prescriptions": { view: true, edit: false, delete: false },
      "Reports & Analytics": { view: false, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-05",
    name: "Lab Technician",
    description: "Laboratory access — test processing, report entry.",
    userCount: 1,
    permissions: {
      "Dashboard": { view: true, edit: false, delete: false },
      "Doctor Management": { view: false, edit: false, delete: false },
      "Patient Management": { view: true, edit: false, delete: false },
      "Appointments": { view: false, edit: false, delete: false },
      "Staff Management": { view: false, edit: false, delete: false },
      "Department": { view: false, edit: false, delete: false },
      "Billing & Invoices": { view: false, edit: false, delete: false },
      "Pharmacy": { view: false, edit: false, delete: false },
      "Laboratory": { view: true, edit: true, delete: false },
      "Radiology": { view: false, edit: false, delete: false },
      "Schedule & Leave": { view: true, edit: false, delete: false },
      "Prescriptions": { view: false, edit: false, delete: false },
      "Reports & Analytics": { view: false, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-06",
    name: "Billing Executive",
    description: "Billing access — invoice generation, payment recording, refunds.",
    userCount: 1,
    permissions: {
      "Dashboard": { view: true, edit: false, delete: false },
      "Doctor Management": { view: false, edit: false, delete: false },
      "Patient Management": { view: true, edit: false, delete: false },
      "Appointments": { view: true, edit: false, delete: false },
      "Staff Management": { view: false, edit: false, delete: false },
      "Department": { view: false, edit: false, delete: false },
      "Billing & Invoices": { view: true, edit: true, delete: true },
      "Pharmacy": { view: false, edit: false, delete: false },
      "Laboratory": { view: false, edit: false, delete: false },
      "Radiology": { view: false, edit: false, delete: false },
      "Schedule & Leave": { view: false, edit: false, delete: false },
      "Prescriptions": { view: false, edit: false, delete: false },
      "Reports & Analytics": { view: true, edit: false, delete: false },
    },
  },
];

export function generateRoleId(existing) {
  const nums = existing.map((r) => parseInt(r.id.split("-")[1], 10));
  const next = Math.max(...nums, 0) + 1;
  return `ROLE-${String(next).padStart(2, "0")}`;
}

export function emptyPermissions() {
  return Object.fromEntries(permissionModules.map((m) => [m, { view: false, edit: false, delete: false }]));
}