import { CalendarHeart } from "lucide-react";
import { hospitalHolidays } from "../../data/scheduleManagementData";

export default function HolidayCalendar() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Hospital Holiday Calendar</h3>
      <div className="space-y-3">
        {hospitalHolidays.map((h, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CalendarHeart size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{h.name}</p>
              <p className="text-xs text-gray-400">{h.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}