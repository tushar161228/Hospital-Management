import { Bed, HeartPulse, Scissors, Stethoscope } from "lucide-react";

const facilityMeta = {
  opd: { label: "OPD", icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
  ipd: { label: "IPD", icon: Bed, color: "bg-purple-50 text-purple-600" },
  icu: { label: "ICU", icon: HeartPulse, color: "bg-red-50 text-red-600" },
  ot: { label: "Operation Theatre", icon: Scissors, color: "bg-green-50 text-green-600" },
};

export default function FacilityOverview({ facilities }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(facilities).map(([key, data]) => {
        const meta = facilityMeta[key];
        const Icon = meta.icon;
        const pct = Math.round((data.occupied / data.total) * 100);
        return (
          <div key={key} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${meta.color}`}>
                <Icon size={13} />
              </div>
              <span className="text-xs font-medium text-gray-700">{meta.label}</span>
            </div>
            <p className="text-sm text-gray-800 font-semibold">{data.occupied}/{data.total} occupied</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-green-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}