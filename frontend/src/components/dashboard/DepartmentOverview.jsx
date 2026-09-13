import { useNavigate } from "react-router-dom";
import { HeartPulse, Bone, Brain, Baby, Users2 } from "lucide-react";
import { departmentOverview } from "../../data/dashboardData";

const iconFor = {
  Cardiology: { Icon: HeartPulse, bg: "bg-red-50 text-red-500" },
  Orthopedics: { Icon: Bone, bg: "bg-orange-50 text-orange-500" },
  Neurology: { Icon: Brain, bg: "bg-purple-50 text-purple-500" },
  Pediatrics: { Icon: Baby, bg: "bg-blue-50 text-blue-500" },
  Gynecology: { Icon: Users2, bg: "bg-pink-50 text-pink-500" },
};

export default function DepartmentOverview() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Department Overview</h3>
        <button
          onClick={() => navigate("/departments")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {departmentOverview.map((d) => {
          const { Icon, bg } = iconFor[d.name] || {
            Icon: Users2,
            bg: "bg-gray-50 text-gray-500",
          };
          return (
            <div key={d.name} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bg}`}
              >
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{d.name}</p>
                <p className="text-xs text-gray-400">
                  Doctors: {d.doctors} | Patients Today: {d.patients}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
