import { Clock } from "lucide-react";
import { availabilityToday } from "../../data/doctorDashboardData";

export default function AvailabilityTracker() {
  const percentBooked = Math.round((availabilityToday.booked / availabilityToday.totalSlots) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">My Availability (Today)</h3>
        <button
          onClick={() => alert("Edit schedule panel would open here")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          Edit Schedule
        </button>
      </div>

      <div className="bg-blue-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="font-semibold">{availabilityToday.status}</p>
            <p className="text-xs text-blue-100">{availabilityToday.location}</p>
          </div>
          <span className="ml-auto text-sm text-blue-100">{availabilityToday.timeRange}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-blue-100 mb-1">
          <span>Total Slots: {availabilityToday.totalSlots}</span>
          <span>Booked: {availabilityToday.booked}</span>
          <span>{percentBooked}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${percentBooked}%` }} />
        </div>
      </div>
    </div>
  );
}