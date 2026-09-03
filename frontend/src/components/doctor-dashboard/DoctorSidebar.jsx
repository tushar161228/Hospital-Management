import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  ListOrdered,
  Users,
  Stethoscope,
  FileText,
  FlaskConical,
  Scan,
  CalendarDays,
  CalendarOff,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.png";
import DoctorProfileCard from "./DoctorProfileCard";
import { doctorSidebarNav } from "../../data/doctorDashboardData";

const iconMap = {
  LayoutDashboard,
  CalendarClock,
  ListOrdered,
  Users,
  Stethoscope,
  FileText,
  FlaskConical,
  Scan,
  CalendarDays,
  CalendarOff,
};

export default function DoctorSidebar({ notificationCount = 12 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sutrasync_user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
        <img
          src={logo}
          alt="Sutra Sync Hospital logo"
          className="w-9 h-9 shrink-0"
        />
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold text-blue-700">Sutra Sync</span>
          <span className="text-xs font-medium text-gray-500 mt-0.5">
            Hospital
          </span>
        </div>
      </div>

      <DoctorProfileCard />

      <nav className="flex-1 overflow-y-auto py-3">
        {doctorSidebarNav.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}

        <button
          onClick={() => alert("Notifications page would open here")}
          className="w-full flex items-center justify-between gap-3 px-5 py-2.5 mx-0 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <span className="flex items-center gap-3">
            <Bell size={18} />
            Notifications
          </span>
          {notificationCount > 0 && (
            <span className="bg-red-500 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        <button
          onClick={() => alert("Profile & Settings page would open here")}
          className="w-full flex items-center gap-3 px-5 py-2.5 mx-0 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <Settings size={18} />
          Profile & Settings
        </button>
      </nav>

      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => alert("Help & Support would open here")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <HelpCircle size={18} />
          Help & Support
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-gray-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
