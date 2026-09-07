import { Users, UserPlus, Repeat, FileText, ArrowUp } from "lucide-react";
import { patientOverview } from "../../data/doctorDashboardData";

const iconMap = { users: Users, userPlus: UserPlus, repeat: Repeat, fileText: FileText };

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
};

export default function PatientOverview() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Patient Overview (This Month)</h3>
      <div className="grid grid-cols-2 gap-3">
        {patientOverview.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.label} className="flex items-start gap-2.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorMap[stat.color]}`}>
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 truncate">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUp size={11} className="text-green-500" />
                  <span className="text-green-600">{stat.change} vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}