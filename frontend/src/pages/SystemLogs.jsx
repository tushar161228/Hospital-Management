import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import LogsTabs from "../components/system-logs/LogsTabs";
import LoginLogsTable from "../components/system-logs/LoginLogsTable";
import AuditLogsTable from "../components/system-logs/AuditLogsTable";
import { initialLoginLogs, initialAuditLogs } from "../data/systemLogsData";

export default function SystemLogs() {
  const [activeTab, setActiveTab] = useState("login");
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">System Logs</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; System Logs</p>
          </div>
          <LogsTabs active={activeTab} onChange={setActiveTab} />
          {activeTab === "login" ? <LoginLogsTable logs={initialLoginLogs} /> : <AuditLogsTable logs={initialAuditLogs} />}
        </main>
      </div>
    </div>
  );
}