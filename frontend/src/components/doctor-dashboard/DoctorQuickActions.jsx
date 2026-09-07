import {
  Stethoscope, FileText, FlaskConical, Scan, FileBadge, UserPlus2, StickyNote,
} from "lucide-react";
import { doctorQuickActions } from "../../data/doctorDashboardData";

const iconMap = {
  stethoscope: Stethoscope,
  prescription: FileText,
  lab: FlaskConical,
  radiology: Scan,
  certificate: FileBadge,
  referPatient: UserPlus2,
  note: StickyNote,
};

export default function DoctorQuickActions({ onAction }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {doctorQuickActions.map((qa) => {
          const Icon = iconMap[qa.icon];
          return (
            <button
              key={qa.action}
              onClick={() => onAction?.(qa.action)}
              className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl py-4 px-2 hover:border-blue-700 hover:bg-blue-50 transition"
            >
              <Icon size={22} className="text-blue-700" />
              <span className="text-xs text-gray-600 text-center leading-tight">{qa.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}