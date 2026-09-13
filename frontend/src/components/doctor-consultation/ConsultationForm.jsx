import { CheckCircle2 } from "lucide-react";

export default function ConsultationForm({ diagnosis, onDiagnosisChange, notes, onNotesChange, onComplete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Diagnosis & Notes</h3>

      <div className="space-y-3 mb-5">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Diagnosis</label>
          <input
            value={diagnosis}
            onChange={(e) => onDiagnosisChange(e.target.value)}
            placeholder="e.g. Acute bronchitis, Hypertension Stage 1"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Clinical Notes</label>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={4}
            placeholder="Observations, examination findings, follow-up plan..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition"
      >
        <CheckCircle2 size={16} /> Complete Consultation
      </button>
    </div>
  );
}