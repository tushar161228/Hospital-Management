import { useState, useRef, useEffect } from "react";
import { Menu, Search, ChevronDown, AlertTriangle, Bell } from "lucide-react";
import { doctorProfile, doctorNotifications } from "../../data/doctorDashboardData";

const statusOptions = ["Available", "In Consultation", "On Break", "Offline"];
const statusDot = {
  Available: "bg-green-500",
  "In Consultation": "bg-blue-500",
  "On Break": "bg-amber-500",
  Offline: "bg-gray-400",
};

export default function DoctorTopbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");
  const doctorName = user?.name || "Doctor";

  const [status, setStatus] = useState(doctorProfile.status);
  const [statusOpen, setStatusOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");

  const statusRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) alert(`Searching for "${search}" by name, UHID, phone, or visit ID...`);
  };

  const handleEmergency = () => {
    if (confirm("Report a new emergency case?")) {
      alert("Emergency case form would open here");
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-gray-500 hover:text-gray-700 lg:hidden">
          <Menu size={22} />
        </button>
        <h2 className="font-semibold text-gray-900 hidden sm:block">Dashboard</h2>
      </div>

      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md mx-6">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients by name, UHID, phone, visit ID..."
          className="bg-transparent outline-none text-sm w-full"
        />
        <kbd className="text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">⌘K</kbd>
      </form>

      <div className="flex items-center gap-4">
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => setStatusOpen((o) => !o)}
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          >
            <span className={`w-2 h-2 rounded-full ${statusDot[status]}`} />
            {status}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {statusOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setStatusOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className={`w-2 h-2 rounded-full ${statusDot[s]}`} />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleEmergency}
          className="flex items-center gap-1.5 border border-red-200 text-red-600 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-red-50 transition"
        >
          <AlertTriangle size={15} />
          Emergency
        </button>

        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen((o) => !o)} className="relative text-gray-500 hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {doctorNotifications.length}
            </span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20">
              <div className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-b border-gray-100">
                Notifications
              </div>
              {doctorNotifications.slice(0, 4).map((n, i) => (
                <div key={i} className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-800">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.meta}</p>
                </div>
              ))}
              <button className="w-full text-center text-sm text-blue-700 font-medium py-2">
                View all
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
            {doctorName.replace("Dr. ", "").charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">{doctorName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{doctorProfile.specialization}</p>
          </div>
        </div>
      </div>
    </header>
  );
}