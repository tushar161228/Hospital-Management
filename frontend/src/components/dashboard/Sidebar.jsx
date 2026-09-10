import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarClock,
  UserCog,
  Building2,
  Receipt,
  Pill,
  FlaskConical,
  Scan,
  CalendarDays,
  BarChart3,
  MessageSquare,
  UserCircle,
  ShieldCheck,
  Settings,
  FileClock,
  DatabaseBackup,
  ChevronRight,
  Plus,
  UserPlus,
  ClipboardPlus,
  FilePlus,
  FileText,
} from "lucide-react";
import logo from "../../assets/logo.png";
import { sidebarNav } from "../../data/dashboardData";

const iconMap = {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarClock,
  UserCog,
  Building2,
  Receipt,
  Pill,
  FlaskConical,
  Scan,
  CalendarDays,
  BarChart3,
  MessageSquare,
  UserCircle,
  ShieldCheck,
  Settings,
  FileClock,
  DatabaseBackup,
  FileText,
};

const quickActions = [
  { label: "Add New Doctor", icon: UserPlus, action: "add-doctor" },
  {
    label: "Book Appointment",
    icon: CalendarClock,
    action: "book-appointment",
  },
  { label: "Add New Patient", icon: ClipboardPlus, action: "add-patient" },
  { label: "Create Invoice", icon: FilePlus, action: "create-invoice" },
];

export default function Sidebar({ onQuickAction }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
        <img src={logo} alt="Sutra Sync logo" className="w-9 h-9 shrink-0" />
        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold text-teal-700">Sutra Sync</span>
          <span className="text-xs font-medium text-gray-500 mt-0.5">
            Hospital
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {sidebarNav.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-5 py-2.5 mx-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {item.label}
              </span>
              <ChevronRight size={14} className="opacity-50" />
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Quick Actions
          </span>
          <Plus size={16} className="text-gray-400" />
        </div>
        <div className="space-y-1">
          {quickActions.map((qa) => (
            <button
              key={qa.action}
              onClick={() => onQuickAction?.(qa.action)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              <qa.icon size={16} className="text-blue-700" />
              {qa.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-4">
          © 2026 Sutra Sync Hospital
          <br />
          All rights reserved.
        </div>
      </div>
    </aside>
  );
}
