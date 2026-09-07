import { AlertTriangle, CalendarClock, FlaskConical, FileText, CalendarPlus } from "lucide-react";
import { doctorNotifications } from "../../data/doctorDashboardData";

const iconMap = {
  emergency: { Icon: AlertTriangle, bg: "bg-red-50 text-red-500" },
  calendar: { Icon: CalendarClock, bg: "bg-blue-50 text-blue-500" },
  lab: { Icon: FlaskConical, bg: "bg-green-50 text-green-600" },
  prescription: { Icon: FileText, bg: "bg-amber-50 text-amber-600" },
  calendarPlus: { Icon: CalendarPlus, bg: "bg-purple-50 text-purple-500" },
};

export default function DoctorNotifications() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button
          onClick={() => alert("Full notifications list would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {doctorNotifications.map((n, i) => {
          const { Icon, bg } = iconMap[n.icon];
          return (
            <div key={i} className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400">{n.meta}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}