import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import NotificationComposer from "../components/notifications-management/NotificationComposer";
import NotificationHistory from "../components/notifications-management/NotificationHistory";
import AnnouncementBoard from "../components/notifications-management/AnnouncementBoard";
import { initialNotificationHistory, initialAnnouncements } from "../data/notificationsManagementData";

export default function NotificationsManagement() {
  const [history, setHistory] = useState(initialNotificationHistory);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const handleSend = (notification) => {
    setHistory((prev) => [notification, ...prev]);
  };

  const handlePostAnnouncement = (announcement) => {
    setAnnouncements((prev) => [...prev, announcement]);
  };

  const handleDeleteAnnouncement = (announcement) => {
    if (confirm(`Delete announcement "${announcement.title}"?`)) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== announcement.id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Communication & Notifications</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Communication</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 space-y-5">
              <NotificationComposer existingHistory={history} onSend={handleSend} />
            </div>
            <div className="lg:col-span-1">
              <NotificationHistory history={history} />
            </div>
            <div className="lg:col-span-1">
              <AnnouncementBoard
                announcements={announcements}
                onPost={handlePostAnnouncement}
                onDelete={handleDeleteAnnouncement}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}