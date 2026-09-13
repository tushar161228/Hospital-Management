import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm text-gray-800 font-medium shrink-0">
      <Calendar size={15} className="text-blue-700" />
      {dateStr}
      <span className="text-gray-300">|</span>
      <Clock size={15} className="text-blue-700" />
      {timeStr}
    </div>
  );
}