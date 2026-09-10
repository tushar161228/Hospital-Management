export const initialHospitalInfo = {
  name: "Sutra Sync Hospital",
  registrationNumber: "HOSP-REG-2024-8871",
  email: "admin@sutrasync.com",
  phone: "+91 11 4567 8900",
  address: "12 MG Road, Sector 12, Delhi, India",
  website: "www.sutrasync.com",
};

export const initialBranding = {
  primaryColor: "#1d4ed8",
  theme: "Light",
  language: "English",
};

export const initialNotificationSettings = {
  emailEnabled: true,
  smsEnabled: true,
  pushEnabled: true,
  emergencyAlertsEnabled: true,
  smtpHost: "smtp.sutrasync.com",
  smsGateway: "Twilio",
};

export const initialBackupSettings = {
  autoBackupEnabled: true,
  frequency: "Daily",
  lastBackup: "27 May 2026, 02:00 AM",
  retentionDays: 30,
};

export const languageOptions = ["English", "Hindi", "Punjabi", "Tamil", "Telugu"];
export const themeOptions = ["Light", "Dark", "System Default"];
export const backupFrequencyOptions = ["Daily", "Weekly", "Monthly"];