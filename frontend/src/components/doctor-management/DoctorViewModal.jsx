import { X, Mail, Phone, Building2, Award, BadgeCheck, IndianRupee, Clock } from "lucide-react";

export default function DoctorViewModal({ doctor, onClose }) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-semibold mb-3">
            {doctor.name.replace("Dr. ", "").charAt(0)}
          </div>
          <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
          <span className={`mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${doctor.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
            {doctor.status}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <Row icon={Mail} label={doctor.email} />
          <Row icon={Phone} label={doctor.phone} />
          <Row icon={Building2} label={`${doctor.department} — ${doctor.branch}`} />
          <Row icon={Award} label={doctor.qualification} />
          <Row icon={BadgeCheck} label={`License: ${doctor.license}`} />
          <Row icon={IndianRupee} label={`Consultation Fee: ₹${doctor.consultationFee}`} />
          <Row icon={Clock} label={`${doctor.workingDays?.join(", ") || "—"}  •  ${doctor.workingHours}`} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Doctor ID</p>
            <p className="font-mono text-gray-700">{doctor.id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Employee ID</p>
            <p className="font-mono text-gray-700">{doctor.empId}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Experience</p>
            <p className="text-gray-700">{doctor.experience} years</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Room</p>
            <p className="text-gray-700">{doctor.room}</p>
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