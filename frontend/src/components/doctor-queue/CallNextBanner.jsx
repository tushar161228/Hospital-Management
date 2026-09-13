import { Volume2, SkipForward } from "lucide-react";

export default function CallNextBanner({ nextPatient, onCallNext }) {
  if (!nextPatient) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-400 text-sm mb-5">
        Queue is empty — no patients waiting.
      </div>
    );
  }

  return (
    <div className="bg-blue-700 rounded-xl p-5 text-white mb-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Volume2 size={22} />
        </div>
        <div>
          <p className="text-xs text-blue-100">Next in Queue</p>
          <p className="text-lg font-bold">{nextPatient.patient}</p>
          <p className="text-xs text-blue-100">{nextPatient.meta}</p>
        </div>
      </div>
      <button
        onClick={onCallNext}
        className="flex items-center gap-2 bg-white text-blue-700 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition"
      >
        <SkipForward size={16} /> Call Next Patient
      </button>
    </div>
  );
}