import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { doctorProfile } from "../../data/doctorDashboardData";

const statusOptions = ["Available", "In Consultation", "On Break", "Offline"];

const statusDot = {
  Available: "bg-green-500",
  "In Consultation": "bg-blue-500",
  "On Break": "bg-amber-500",
  Offline: "bg-gray-400",
};

export default function DoctorProfileCard() {
  const [status, setStatus] = useState(doctorProfile.status);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg font-semibold shrink-0 overflow-hidden">
          {doctorProfile.photo ? (
            <img src={doctorProfile.photo} alt={doctorProfile.name} className="w-full h-full object-cover" />
          ) : (
            doctorProfile.name.replace("Dr. ", "").charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{doctorProfile.name}</p>
          <p className="text-xs text-gray-500">{doctorProfile.specialization}</p>
          <p className="text-xs text-gray-400">{doctorProfile.qualifications}</p>
        </div>
      </div>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusDot[status]}`} />
            {status}
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {open && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span className={`w-2 h-2 rounded-full ${statusDot[s]}`} />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}