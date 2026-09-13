import { Phone, Droplet, Calendar, FileText } from "lucide-react";

export default function DoctorPatientCard({ patient, onViewHistory }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
          {patient.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{patient.name}</p>
          <p className="text-xs text-gray-400">{patient.age} yrs • {patient.gender}</p>
        </div>
        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${patient.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          {patient.status}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        <p className="flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {patient.phone}</p>
        {patient.bloodGroup && <p className="flex items-center gap-1.5"><Droplet size={12} className="text-gray-400" /> {patient.bloodGroup}</p>}
        <p className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> Last visit: {patient.lastVisit}</p>
      </div>

      <button
        onClick={() => onViewHistory(patient)}
        className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-blue-700 hover:bg-blue-50"
      >
        <FileText size={13} /> View Medical History
      </button>
    </div>
  );
}