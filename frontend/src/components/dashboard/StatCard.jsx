import {
  Stethoscope,
  UserCheck,
  UserX,
  Users,
  CalendarClock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IndianRupee,
  FileText,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

const iconMap = {
  doctor: Stethoscope,
  doctorActive: UserCheck,
  doctorInactive: UserX,
  patients: Users,
  calendar: CalendarClock,
  check: CheckCircle2,
  clock: Clock,
  emergency: AlertTriangle,
  revenue: IndianRupee,
  invoice: FileText,
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  gray: "bg-gray-100 text-gray-500",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  teal: "bg-teal-50 text-teal-700",
  indigo: "bg-indigo-50 text-indigo-600",
};

export default function StatCard({ label, value, change, trend, icon, color }) {
  const Icon = iconMap[icon] || Users;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${colorMap[color]}`}
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <div className="flex items-center gap-1 text-xs mt-0.5">
          {trend === "up" && <ArrowUp size={12} className="text-green-500" />}
          {trend === "down" && <ArrowDown size={12} className="text-red-500" />}
          {trend === "flat" && <Minus size={12} className="text-gray-400" />}
          <span
            className={
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                  ? "text-red-500"
                  : trend === "alert"
                    ? "text-red-600 font-medium"
                    : "text-gray-400"
            }
          >
            {change}
            {trend === "up" || trend === "down" ? " vs last month" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
