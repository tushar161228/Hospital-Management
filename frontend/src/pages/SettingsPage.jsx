import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import SettingsTabs from "../components/settings-management/SettingsTabs";
import HospitalInfoSettings from "../components/settings-management/HospitalInfoSettings";
import BrandingSettings from "../components/settings-management/BrandingSettings";
import NotificationSettings from "../components/settings-management/NotificationSettings";
import BackupSettings from "../components/settings-management/BackupSettings";
import {
  initialHospitalInfo, initialBranding, initialNotificationSettings, initialBackupSettings,
} from "../data/settingsData";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("hospital");
  const [hospitalInfo, setHospitalInfo] = useState(initialHospitalInfo);
  const [branding, setBranding] = useState(initialBranding);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);
  const [backupSettings, setBackupSettings] = useState(initialBackupSettings);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Settings</p>
          </div>

          <SettingsTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "hospital" && <HospitalInfoSettings info={hospitalInfo} onSave={setHospitalInfo} />}
          {activeTab === "branding" && <BrandingSettings branding={branding} onSave={setBranding} />}
          {activeTab === "notifications" && <NotificationSettings settings={notificationSettings} onSave={setNotificationSettings} />}
          {activeTab === "backup" && <BackupSettings settings={backupSettings} onSave={setBackupSettings} />}
        </main>
      </div>
    </div>
  );
}