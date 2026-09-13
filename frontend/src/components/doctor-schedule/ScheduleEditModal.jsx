import { useState } from "react";
import { X } from "lucide-react";

export default function ScheduleEditModal({ day, current, onClose, onSave }) {
  const [working, setWorking] = useState(current?.working ?? false);
  const [hours, setHours] = useState(current?.hours || "09:00 AM - 05:00 PM");

  const handleSave = () => {
    onSave(day, { working, hours: working ? hours : "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-4">{day}</h2>

        <label className="flex items-center gap-2 text-sm text-gray-700 mb-4">
          <input type="checkbox" checked={working} onChange={(e) => setWorking(e.target.checked)} />
          Working this day
        </label>

        {working && (
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 09:00 AM - 05:00 PM"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 mb-4"
          />
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}