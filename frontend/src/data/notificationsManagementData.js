export const recipientGroups = ["All Doctors", "All Staff", "All Patients", "Specific Department"];
export const notificationChannels = ["Push", "SMS", "Email"];

export const initialNotificationHistory = [
  {
    id: "NTF-1001",
    title: "Emergency Alert — Mass Casualty Drill",
    recipients: "All Doctors",
    channels: ["Push", "SMS"],
    priority: "Emergency",
    sentOn: "27 May 2026, 08:00 AM",
    status: "Delivered",
  },
  {
    id: "NTF-1002",
    title: "Revised OPD Timings from June 1",
    recipients: "All Staff",
    channels: ["Push", "Email"],
    priority: "Normal",
    sentOn: "26 May 2026, 05:30 PM",
    status: "Delivered",
  },
  {
    id: "NTF-1003",
    title: "Appointment Reminder Campaign",
    recipients: "All Patients",
    channels: ["SMS"],
    priority: "Normal",
    sentOn: "26 May 2026, 09:00 AM",
    status: "Delivered",
  },
  {
    id: "NTF-1004",
    title: "Cardiology Dept. Equipment Maintenance",
    recipients: "Specific Department",
    channels: ["Push"],
    priority: "Normal",
    sentOn: "25 May 2026, 02:15 PM",
    status: "Delivered",
  },
];

export const initialAnnouncements = [
  {
    id: "ANN-01",
    title: "New Cafeteria Timings",
    body: "The staff cafeteria will now operate from 7:00 AM to 10:00 PM starting next week.",
    postedOn: "24 May 2026",
    pinned: true,
  },
  {
    id: "ANN-02",
    title: "Annual Health Checkup Camp",
    body: "Free health checkup camp for all hospital staff on 5th June at the Main Branch auditorium.",
    postedOn: "20 May 2026",
    pinned: false,
  },
];

export function generateNotificationId(existing) {
  const nums = existing.map((n) => parseInt(n.id.split("-")[1], 10));
  const next = Math.max(...nums, 1000) + 1;
  return `NTF-${next}`;
}

export function generateAnnouncementId(existing) {
  const nums = existing.map((a) => parseInt(a.id.split("-")[1], 10));
  const next = Math.max(...nums, 0) + 1;
  return `ANN-${String(next).padStart(2, "0")}`;
}