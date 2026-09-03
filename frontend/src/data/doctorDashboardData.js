export const doctorProfile = {
  name: "Dr. Rajesh Sharma",
  specialization: "Cardiologist",
  qualifications: "MBBS, MD, DM (Cardiology)",
  status: "Available",
  photo: null, // add a photo path here later, e.g. "/src/assets/doctor.jpg"
};

export const doctorStats = [
  {
    label: "Today's Appointments",
    value: "28",
    change: "12%",
    trend: "up",
    icon: "calendar",
    color: "blue",
    link: null,
  },
  {
    label: "Patients in Queue",
    value: "8",
    change: "View Queue",
    trend: "link",
    icon: "queue",
    color: "orange",
    link: "queue",
  },
  {
    label: "Completed Consultations",
    value: "16",
    change: "18%",
    trend: "up",
    icon: "check",
    color: "purple",
    link: null,
  },
  {
    label: "Pending Prescriptions",
    value: "5",
    change: "View All",
    trend: "link",
    icon: "prescription",
    color: "blue",
    link: "prescriptions",
  },
  {
    label: "Lab Orders",
    value: "14",
    change: "View All",
    trend: "link",
    icon: "lab",
    color: "green",
    link: "lab",
  },
  {
    label: "Radiology Orders",
    value: "6",
    change: "View All",
    trend: "link",
    icon: "radiology",
    color: "red",
    link: "radiology",
  },
];

export const todaysSchedule = [
  {
    time: "09:00 AM",
    token: "12",
    patient: "Amit Verma",
    meta: "45 Y / M  •  Follow Up",
    status: "Completed",
  },
  {
    time: "09:30 AM",
    token: "13",
    patient: "Neha Singh",
    meta: "32 Y / F  •  Consultation",
    status: "In Progress",
  },
  {
    time: "10:00 AM",
    token: "14",
    patient: "Suresh Kumar",
    meta: "58 Y / M  •  New Patient",
    status: "In Queue",
  },
  {
    time: "10:30 AM",
    token: "15",
    patient: "Anjali Mehta",
    meta: "27 Y / F  •  Consultation",
    status: "In Queue",
  },
  {
    time: "11:00 AM",
    token: "16",
    patient: "Rahul Joshi",
    meta: "48 Y / M  •  Follow Up",
    status: "Scheduled",
  },
];

export const patientQueue = [
  {
    position: 1,
    patient: "Suresh Kumar",
    meta: "58 Y / M  •  New Patient",
    waitTime: "25 mins",
  },
  {
    position: 2,
    patient: "Anjali Mehta",
    meta: "27 Y / F  •  Consultation",
    waitTime: "15 mins",
  },
  {
    position: 3,
    patient: "Ravi Sharma",
    meta: "32 Y / M  •  Follow Up",
    waitTime: "12 mins",
  },
  {
    position: 4,
    patient: "Meena Patel",
    meta: "40 Y / F  •  Consultation",
    waitTime: "8 mins",
  },
];

export const upcomingAppointments = [
  {
    time: "11:30 AM",
    patient: "Pooja Singh",
    type: "Follow Up",
    reason: "Post Surgery Checkup",
    status: "Scheduled",
  },
  {
    time: "12:00 PM",
    patient: "Vikram Patel",
    type: "Consultation",
    reason: "Chest Pain",
    status: "Scheduled",
  },
  {
    time: "12:30 PM",
    patient: "Neelam Gupta",
    type: "Consultation",
    reason: "Hypertension",
    status: "Scheduled",
  },
  {
    time: "01:00 PM",
    patient: "Mohit Jain",
    type: "Follow Up",
    reason: "ECG Review",
    status: "Scheduled",
  },
];

export const recentPrescriptions = [
  { patient: "Amit Verma", date: "27 May 2026, 09:05 AM", status: "Signed" },
  { patient: "Neha Singh", date: "27 May 2026, 09:35 AM", status: "Signed" },
  { patient: "Ravi Sharma", date: "27 May 2026, 09:50 AM", status: "Pending" },
  { patient: "Suresh Kumar", date: "27 May 2026, 10:05 AM", status: "Pending" },
  { patient: "Anjali Mehta", date: "27 May 2026, 10:20 AM", status: "Draft" },
];

export const patientOverview = [
  {
    label: "Total Patients",
    value: "1,248",
    change: "9.2%",
    icon: "users",
    color: "blue",
  },
  {
    label: "New Patients",
    value: "186",
    change: "11.4%",
    icon: "userPlus",
    color: "green",
  },
  {
    label: "Returning Patients",
    value: "1,062",
    change: "8.7%",
    icon: "repeat",
    color: "purple",
  },
  {
    label: "Consultations",
    value: "896",
    change: "10.3%",
    icon: "fileText",
    color: "orange",
  },
];

export const doctorNotifications = [
  {
    text: "Emergency case admitted in ER",
    meta: "Patient: Rajesh Malhotra, 62 Y/M",
    time: "10:15 AM",
    icon: "emergency",
  },
  {
    text: "Your 11:30 AM appointment rescheduled",
    meta: "Patient: Pooja Singh",
    time: "09:45 AM",
    icon: "calendar",
  },
  {
    text: "Lab results available",
    meta: "Patient: Amit Verma",
    time: "08:30 AM",
    icon: "lab",
  },
  {
    text: "5 prescriptions pending",
    meta: "Review and sign prescriptions",
    time: "08:15 AM",
    icon: "prescription",
  },
  {
    text: "New appointment booked",
    meta: "11:00 AM  •  Patient: Vikram Patel",
    time: "07:50 AM",
    icon: "calendarPlus",
  },
];

export const availabilityToday = {
  status: "Available Now",
  location: "Clinic OPD",
  timeRange: "09:00 AM - 05:00 PM",
  totalSlots: 28,
  booked: 20,
};

export const doctorQuickActions = [
  {
    label: "New Consultation",
    icon: "stethoscope",
    action: "new-consultation",
  },
  {
    label: "Add Prescription",
    icon: "prescription",
    action: "add-prescription",
  },
  { label: "Order Lab Test", icon: "lab", action: "order-lab" },
  { label: "Order Radiology", icon: "radiology", action: "order-radiology" },
  {
    label: "Medical Certificate",
    icon: "certificate",
    action: "medical-certificate",
  },
  { label: "Refer Patient", icon: "referPatient", action: "refer-patient" },
  { label: "Add Note", icon: "note", action: "add-note" },
];

export const doctorSidebarNav = [
  { label: "Dashboard", icon: "LayoutDashboard", path: "/doctor-dashboard" },
  {
    label: "My Appointments",
    icon: "CalendarClock",
    path: "/doctor/appointments",
  },
  { label: "Today's Queue", icon: "ListOrdered", path: "/doctor/queue" },
  { label: "Patients", icon: "Users", path: "/doctor/patients" },
  { label: "Consultation", icon: "Stethoscope", path: "/doctor/consultation" },
  { label: "Prescriptions", icon: "FileText", path: "/doctor/prescriptions" },
  { label: "Lab Orders", icon: "FlaskConical", path: "/doctor/lab-orders" },
  { label: "Radiology", icon: "Scan", path: "/doctor/radiology" },
  { label: "Schedule", icon: "CalendarDays", path: "/doctor/schedule" },
  { label: "Leave", icon: "CalendarOff", path: "/doctor/leave" },
];
