import {
  X,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Stethoscope,
  Calendar,
  FileText,
} from "lucide-react";

const mockHistory = [
  {
    date: "27 May 2026",
    note: "Routine consultation — vitals stable, prescribed follow-up in 2 weeks.",
  },
  { date: "10 Mar 2026", note: "Lab test: CBC — results within normal range." },
  {
    date: "15 Jan 2026",
    note: "Initial registration — no prior chronic conditions reported.",
  },
];

export default function PatientViewModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-semibold mb-3">
            {patient.name.charAt(0)}
          </div>
          <h2 className="text-lg font-bold text-gray-800">{patient.name}</h2>
          <p className="text-sm text-gray-500">
            {patient.age} yrs • {patient.gender}
          </p>
          <span
            className={`mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${patient.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}
          >
            {patient.status}
          </span>
        </div>

        <div className="space-y-3 text-sm mb-5">
          <Row icon={Phone} label={patient.phone} />
          {patient.email && <Row icon={Mail} label={patient.email} />}
          {patient.address && <Row icon={MapPin} label={patient.address} />}
          {patient.bloodGroup && (
            <Row icon={Droplet} label={`Blood Group: ${patient.bloodGroup}`} />
          )}
          <Row
            icon={Stethoscope}
            label={`${patient.assignedDoctor || "Unassigned"} — ${patient.department || "—"}`}
          />
          <Row
            icon={Calendar}
            label={`Registered: ${patient.registeredOn}  •  Last Visit: ${patient.lastVisit}`}
          />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <FileText size={14} /> Medical History
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {mockHistory.map((h, i) => (
              <div key={i} className="text-xs">
                <p className="text-gray-400">{h.date}</p>
                <p className="text-gray-600">{h.note}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <Icon size={16} className="text-gray-400 shrink-0" />
      <span>{label}</span>
    </div>
  );
}
