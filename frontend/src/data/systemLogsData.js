export const initialLoginLogs = [
  { id: "LOG-1", user: "Admin User", email: "admin@sutrasync.com", timestamp: "27 May 2026, 09:12 AM", ip: "192.168.1.14", status: "Success" },
  { id: "LOG-2", user: "Dr. Rajesh Sharma", email: "rajesh.sharma@sutrasync.com", timestamp: "27 May 2026, 08:55 AM", ip: "192.168.1.22", status: "Success" },
  { id: "LOG-3", user: "Unknown", email: "pooja.n@sutrasync.com", timestamp: "27 May 2026, 07:30 AM", ip: "103.44.12.201", status: "Failed" },
  { id: "LOG-4", user: "Neha Singh", email: "neha.r@sutrasync.com", timestamp: "27 May 2026, 08:40 AM", ip: "192.168.1.18", status: "Success" },
  { id: "LOG-5", user: "Unknown", email: "admin@sutrasync.com", timestamp: "26 May 2026, 11:58 PM", ip: "45.12.88.3", status: "Failed" },
];

export const initialAuditLogs = [
  { id: "AUD-1", user: "Admin User", action: "Created", target: "Doctor: Dr. Neha Gupta (DOC-1004)", timestamp: "27 May 2026, 09:20 AM" },
  { id: "AUD-2", user: "Admin User", action: "Updated", target: "Patient: Anjali Mehta (PAT-2004)", timestamp: "27 May 2026, 09:05 AM" },
  { id: "AUD-3", user: "Dr. Rajesh Sharma", action: "Signed", target: "Prescription: RX-6001", timestamp: "27 May 2026, 09:06 AM" },
  { id: "AUD-4", user: "Admin User", action: "Deleted", target: "Medicine: Ibuprofen 400mg (MED-3998)", timestamp: "26 May 2026, 04:15 PM" },
  { id: "AUD-5", user: "Admin User", action: "Approved", target: "Leave Request: LV-9002 (Meena Patel)", timestamp: "25 May 2026, 02:30 PM" },
];