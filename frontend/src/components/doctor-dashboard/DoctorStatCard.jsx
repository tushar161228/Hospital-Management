import {
  CalendarClock, Users, CheckCircle2, FileText, FlaskConical, Scan, ArrowUp,
} from "lucide-react";

const iconMap = {
  calendar: CalendarClock,
  queue: Users,
  check: CheckCircle2,
  prescription: FileText,
  lab: FlaskConical,
  radiology: Scan,
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
};

export default function DoctorStatCard({ label, value, change, trend, icon, color, link, onLinkClick }) {
  const Icon = iconMap[icon] || Users;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {trend === "link" ? (
          <button
            onClick={() => onLinkClick?.(link)}
            className="text-xs text-blue-700 font-medium hover:underline mt-0.5"
          >
            {change} →
          </button>
        ) : (
          <div className="flex items-center gap-1 text-xs mt-0.5">
            <ArrowUp size={12} className="text-green-500" />
            <span className="text-green-600">{change} vs yesterday</span>
          </div>
        )}
      </div>
    </div>
  );
}