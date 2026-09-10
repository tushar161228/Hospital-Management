import { X, Pill, FileText } from "lucide-react";

const statusStyles = {
  Signed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Draft: "bg-gray-100 text-gray-500",
};

export default function PrescriptionViewModal({ prescription, onClose, onSign }) {
  if (!prescription) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <FileText size={18} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">{prescription.id}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-1">{prescription.patient} ({prescription.patientId})</p>
        <p className="text-sm text-gray-500 mb-4">{prescription.doctor} • {prescription.date}</p>

        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-4 ${statusStyles[prescription.status]}`}>
          {prescription.status}
        </span>

        {prescription.medicines.length > 0 ? (
          <div className="space-y-3 mb-4">
            {prescription.medicines.map((m, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Pill size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.dosage}</p>
                  <p className="text-xs text-gray-400">Duration: {m.duration}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-4">No medicines added yet — this is a draft.</p>
        )}

        {prescription.notes && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-5">
            <p className="text-xs text-gray-400 mb-1">Notes</p>
            {prescription.notes}
          </div>
        )}

        {prescription.status !== "Signed" && prescription.medicines.length > 0 ? (
          <button
            onClick={() => { onSign(prescription); onClose(); }}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Sign Prescription
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}