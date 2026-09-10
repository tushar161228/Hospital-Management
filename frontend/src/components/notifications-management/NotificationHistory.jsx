import { Bell, AlertTriangle, Mail, MessageSquare, Smartphone } from "lucide-react";

const channelIcons = { Push: Smartphone, SMS: MessageSquare, Email: Mail };

export default function NotificationHistory({ history }) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No notifications sent yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Notification History</h3>
      <div className="space-y-3">
        {history.map((n) => (
          <div key={n.id} className={`flex items-start justify-between gap-3 border rounded-lg p-3 ${n.priority === "Emergency" ? "border-red-200 bg-red-50/50" : "border-gray-100"}`}>
            <div className="flex items-start gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.priority === "Emergency" ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                {n.priority === "Emergency" ? <AlertTriangle size={16} /> : <Bell size={16} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{n.title}</p>
                <p className="text-xs text-gray-500">To: {n.recipients}</p>
                <div className="flex items-center gap-2 mt-1">
                  {n.channels.map((ch) => {
                    const Icon = channelIcons[ch];
                    return (
                      <span key={ch} className="flex items-center gap-1 text-xs text-gray-400">
                        <Icon size={11} /> {ch}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">{n.sentOn}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-600">
                {n.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}