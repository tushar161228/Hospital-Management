import { useNavigate } from "react-router-dom";
import {
  LogIn,
  CalendarPlus,
  IndianRupee,
  FileText,
  UserPlus,
} from "lucide-react";
import { recentActivities } from "../../data/dashboardData";

const iconMap = {
  login: { Icon: LogIn, bg: "bg-blue-50 text-blue-500" },
  appointment: { Icon: CalendarPlus, bg: "bg-teal-50 text-teal-600" },
  payment: { Icon: IndianRupee, bg: "bg-green-50 text-green-600" },
  lab: { Icon: FileText, bg: "bg-purple-50 text-purple-500" },
  patient: { Icon: UserPlus, bg: "bg-orange-50 text-orange-500" },
};

export default function RecentActivities() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Recent Activities</h3>
        <button
          onClick={() => navigate("/logs")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {recentActivities.map((a, i) => {
          const { Icon, bg } = iconMap[a.icon];
          return (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}
              >
                <Icon size={14} />
              </div>
              <div>
                <p className="text-sm text-gray-700">{a.text}</p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
