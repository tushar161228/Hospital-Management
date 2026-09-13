import { useState } from "react";
import { X } from "lucide-react";

export default function ConsultationNoteModal({ appointment, onClose, onSave }) {
  const [note, setNote] = useState(appointment.consultationNote || "");

  const handleSave = () => {
    onSave(appointment, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">Consultation Note</h2>
        <p className="text-sm text-gray-500 mb-4">{appointment.patient} — {appointment.date}, {appointment.time}</p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          placeholder="Enter consultation notes, observations, or follow-up instructions..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
        />

        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}