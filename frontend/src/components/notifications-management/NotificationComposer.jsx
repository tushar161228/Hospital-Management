import { useState } from "react";
import { Send, AlertTriangle } from "lucide-react";
import { recipientGroups, notificationChannels, generateNotificationId } from "../../data/notificationsManagementData";
import { departments } from "../../data/doctorManagementData";

export default function NotificationComposer({ existingHistory, onSend }) {
  const [title, setTitle] = useState("");
  const [recipients, setRecipients] = useState("");
  const [department, setDepartment] = useState("");
  const [channels, setChannels] = useState([]);
  const [isEmergency, setIsEmergency] = useState(false);

  const toggleChannel = (channel) => {
    setChannels((prev) => (prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!title.trim() || !recipients || channels.length === 0) {
      alert("Please enter a title, select recipients, and at least one channel");
      return;
    }
    if (recipients === "Specific Department" && !department) {
      alert("Please select a department");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    onSend({
      id: generateNotificationId(existingHistory),
      title,
      recipients: recipients === "Specific Department" ? `${department} Dept.` : recipients,
      channels: isEmergency ? ["Push", "SMS"] : channels,
      priority: isEmergency ? "Emergency" : "Normal",
      sentOn: today,
      status: "Delivered",
    });

    setTitle("");
    setRecipients("");
    setDepartment("");
    setChannels([]);
    setIsEmergency(false);
    alert("Notification sent successfully.");
  };

  return (
    <form onSubmit={handleSend} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Compose Notification</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Notification title / message"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
      />

      <select
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
      >
        <option value="">Select Recipients</option>
        {recipientGroups.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>

      {recipients === "Specific Department" && (
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
        >
          <option value="">Select Department</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      )}

      <div>
        <p className="text-xs text-gray-500 mb-2">Channels</p>
        <div className="flex gap-2">
          {notificationChannels.map((ch) => (
            <button
              key={ch}
              type="button"
              disabled={isEmergency}
              onClick={() => toggleChannel(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition disabled:opacity-50 ${
                channels.includes(ch) || (isEmergency && (ch === "Push" || ch === "SMS"))
                  ? "bg-blue-700 text-white border-blue-700"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
        <input type="checkbox" checked={isEmergency} onChange={(e) => setIsEmergency(e.target.checked)} />
        <AlertTriangle size={14} />
        Mark as Emergency Broadcast (forces Push + SMS, high priority)
      </label>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition"
      >
        <Send size={15} /> Send Notification
      </button>
    </form>
  );
}