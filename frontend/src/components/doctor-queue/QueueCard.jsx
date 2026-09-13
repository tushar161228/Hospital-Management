import { CheckCircle2, SkipForward, Clock } from "lucide-react";

const positionColor = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-gray-400"];

export default function QueueCard({ patient, index, isActive, onCallIn, onComplete, onSkip }) {
  return (
    <div className={`flex items-center justify-between rounded-lg p-3 border ${isActive ? "border-blue-700 bg-blue-50/50" : "border-gray-100"}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center shrink-0 ${positionColor[index] || "bg-gray-400"}`}>
          {index + 1}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{patient.patient}</p>
          <p className="text-xs text-gray-500">{patient.meta}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <p className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> Waiting</p>
          <p className="text-sm font-semibold text-red-500">{patient.waitTime}</p>
        </div>
        {isActive ? (
          <button onClick={() => onComplete(patient)} className="flex items-center gap-1 text-xs text-green-600 hover:underline">
            <CheckCircle2 size={13} /> Complete
          </button>
        ) : (
          <button onClick={() => onCallIn(patient)} className="flex items-center gap-1 text-xs text-blue-700 hover:underline">
            Call In
          </button>
        )}
        <button onClick={() => onSkip(patient)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
          <SkipForward size={13} />
        </button>
      </div>
    </div>
  );
}