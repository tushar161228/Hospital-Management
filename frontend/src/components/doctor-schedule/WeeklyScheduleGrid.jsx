import { Clock, Pencil } from "lucide-react";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeeklyScheduleGrid({ schedule, onEditDay }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Weekly Schedule</h3>
      <div className="space-y-2">
        {weekDays.map((day) => {
          const daySchedule = schedule[day];
          const isWorking = daySchedule?.working;
          return (
            <div key={day} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isWorking ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-sm font-medium text-gray-800 w-24">{day}</span>
                {isWorking ? (
                  <span className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock size={13} className="text-gray-400" /> {daySchedule.hours}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Off</span>
                )}
              </div>
              <button onClick={() => onEditDay(day)} className="text-gray-400 hover:text-blue-700">
                <Pencil size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}