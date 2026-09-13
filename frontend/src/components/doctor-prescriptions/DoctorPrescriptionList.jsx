import { Pill } from "lucide-react";
export default function DoctorPrescriptionList({ prescriptions }) {
  if (prescriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No prescriptions written yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">My Prescriptions</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium text-gray-800">{rx.patient}</p>
              <span className="text-xs text-gray-400">{rx.date}</span>
            </div>
            {rx.medicines.map((m, i) => (
              <p key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                <Pill size={11} className="text-blue-600 shrink-0" /> {m.name} — {m.dosage}
              </p>
            ))}
            {rx.notes && <p className="text-xs text-gray-400 mt-1 italic">{rx.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}