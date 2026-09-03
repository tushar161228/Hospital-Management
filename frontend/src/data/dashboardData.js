export const statCards = [
  {
    label: "Total Doctors",
    value: "248",
    change: "12.5%",
    trend: "up",
    icon: "doctor",
    color: "blue",
  },
  {
    label: "Active Doctors",
    value: "218",
    change: "10.3%",
    trend: "up",
    icon: "doctorActive",
    color: "green",
  },
  {
    label: "Inactive Doctors",
    value: "30",
    change: "5.1%",
    trend: "down",
    icon: "doctorInactive",
    color: "gray",
  },
  {
    label: "Total Patients",
    value: "18,742",
    change: "8.7%",
    trend: "up",
    icon: "patients",
    color: "purple",
  },
  {
    label: "Today's Appointments",
    value: "326",
    change: "No change",
    trend: "flat",
    icon: "calendar",
    color: "orange",
  },
  {
    label: "Completed Appointments",
    value: "192",
    change: "14.2%",
    trend: "up",
    icon: "check",
    color: "green",
  },
  {
    label: "Pending Appointments",
    value: "134",
    change: "3.8%",
    trend: "down",
    icon: "clock",
    color: "amber",
  },
  {
    label: "Emergency Cases",
    value: "14",
    change: "High Priority",
    trend: "alert",
    icon: "emergency",
    color: "red",
  },
  {
    label: "Revenue (This Month)",
    value: "₹24,78,540",
    change: "18.6%",
    trend: "up",
    icon: "revenue",
    color: "teal",
  },
  {
    label: "Total Invoices",
    value: "1,248",
    change: "9.2%",
    trend: "up",
    icon: "invoice",
    color: "indigo",
  },
];

export const appointmentsOverview = [
  { day: "21 May", completed: 220, pending: 180, cancelled: 40 },
  { day: "22 May", completed: 300, pending: 210, cancelled: 35 },
  { day: "23 May", completed: 280, pending: 250, cancelled: 45 },
  { day: "24 May", completed: 340, pending: 230, cancelled: 30 },
  { day: "25 May", completed: 310, pending: 260, cancelled: 50 },
  { day: "26 May", completed: 360, pending: 240, cancelled: 38 },
  { day: "27 May", completed: 380, pending: 200, cancelled: 42 },
];

export const revenueBreakdown = [
  { name: "OPD", value: 1045230, percent: 42, color: "#1d4ed8" },  // was #0f6e6e
  { name: "IPD", value: 875400, percent: 35, color: "#3b82f6" },
  { name: "Pharmacy", value: 320600, percent: 13, color: "#f59e0b" },
  { name: "Lab", value: 185760, percent: 7, color: "#22c55e" },
  { name: "Radiology", value: 51550, percent: 3, color: "#a855f7" },
];
export const todaysAppointments = [
  {
    time: "09:00 AM",
    patient: "Amit Verma",
    doctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    type: "New",
    status: "Completed",
  },
  {
    time: "09:30 AM",
    patient: "Neha Singh",
    doctor: "Dr. Priya Patel",
    department: "Dermatology",
    type: "Follow Up",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    patient: "Suresh Kumar",
    doctor: "Dr. Amit Kumar",
    department: "Orthopedics",
    type: "New",
    status: "Completed",
  },
  {
    time: "10:30 AM",
    patient: "Anjali Mehta",
    doctor: "Dr. Neha Gupta",
    department: "Gynecology",
    type: "Follow Up",
    status: "Pending",
  },
  {
    time: "11:00 AM",
    patient: "Rahul Joshi",
    doctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    type: "New",
    status: "Pending",
  },
];

export const departmentOverview = [
  { name: "Cardiology", doctors: 18, patients: 42 },
  { name: "Orthopedics", doctors: 16, patients: 36 },
  { name: "Neurology", doctors: 12, patients: 28 },
  { name: "Pediatrics", doctors: 14, patients: 31 },
  { name: "Gynecology", doctors: 15, patients: 29 },
];

export const emergencyCases = [
  {
    id: "EC-7856",
    title: "Cardiac Arrest",
    patient: "John Doe, 58 Y/M",
    time: "10:24 AM",
    priority: "Critical",
  },
  {
    id: "EC-7855",
    title: "Road Traffic Accident",
    patient: "Ravi Sharma, 32 Y/M",
    time: "10:18 AM",
    priority: "Critical",
  },
  {
    id: "EC-7854",
    title: "Severe Bleeding",
    patient: "Pooja Singh, 27 Y/F",
    time: "10:10 AM",
    priority: "High",
  },
  {
    id: "EC-7853",
    title: "Breathing Difficulty",
    patient: "Mohammed Ali, 45 Y/M",
    time: "09:58 AM",
    priority: "High",
  },
];

export const recentActivities = [
  { text: "Dr. Rajesh Sharma logged in", time: "10:30 AM", icon: "login" },
  {
    text: "New appointment booked by Neha Singh",
    time: "10:28 AM",
    icon: "appointment",
  },
  {
    text: "Payment received — Invoice #INV-1256",
    time: "10:25 AM",
    icon: "payment",
  },
  {
    text: "Lab report uploaded — Patient: Amit Verma",
    time: "10:20 AM",
    icon: "lab",
  },
  {
    text: "New patient registered — Ravi Sharma",
    time: "10:15 AM",
    icon: "patient",
  },
];

export const sidebarNav = [
  { label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
  { label: "Doctor Management", icon: "Stethoscope", path: "/doctors" },
  { label: "Patient Management", icon: "Users", path: "/patients" },
  { label: "Appointments", icon: "CalendarClock", path: "/appointments" },
  { label: "Staff Management", icon: "UserCog", path: "/staff" },
  { label: "Department", icon: "Building2", path: "/departments" },
  { label: "Billing & Invoices", icon: "Receipt", path: "/billing" },
  { label: "Pharmacy", icon: "Pill", path: "/pharmacy" },
  { label: "Laboratory", icon: "FlaskConical", path: "/laboratory" },
  { label: "Radiology", icon: "Scan", path: "/radiology" },
  { label: "Schedule & Timetable", icon: "CalendarDays", path: "/schedule" },
  { label: "Reports & Analytics", icon: "BarChart3", path: "/reports" },
  { label: "Communication", icon: "MessageSquare", path: "/communication" },
  { label: "User Management", icon: "UserCircle", path: "/users" },
  { label: "Roles & Permissions", icon: "ShieldCheck", path: "/roles" },
  { label: "Settings", icon: "Settings", path: "/settings" },
  { label: "System Logs", icon: "FileClock", path: "/logs" },
  { label: "Backup & Restore", icon: "DatabaseBackup", path: "/backup" },
];
