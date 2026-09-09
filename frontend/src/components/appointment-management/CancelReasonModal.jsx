import { useState } from "react";
import { X } from "lucide-react";

const commonReasons = [
  "Patient requested reschedule",
  "Doctor unavailable",
  "Patient no-show",
  "Duplicate booking",
];

export default function CancelReasonModal({ appointment, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleConfirm = () => {
    const finalReason = reason === "Other" ? customReason : reason;
    if (!finalReason.trim()) {
      alert("Please select or enter a cancellation reason");
      return;
    }
    onConfirm(appointment, finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">Cancel Appointment</h2>
        <p className="text-sm text-gray-500 mb-4">
          {appointment.patient} — {appointment.date}, {appointment.time}
        </p>

        <div className="space-y-2 mb-3">
          {commonReasons.map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm text-gray-600">
              <input type="radio" name="reason" value={r} checked={reason === r} onChange={(e) => setReason(e.target.value)} />
              {r}
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="radio" name="reason" value="Other" checked={reason === "Other"} onChange={(e) => setReason(e.target.value)} />
            Other
          </label>
        </div>

        {reason === "Other" && (
          <textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Enter reason..."
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 mb-3"
          />
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Back
          </button>
          <button onClick={handleConfirm} className="flex-1 bg-red-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-red-700 transition">
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}