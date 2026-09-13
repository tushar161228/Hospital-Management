import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Calendar,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const notifications = [
  { text: "New emergency case reported — EC-7856", time: "2 min ago" },
  { text: "Dr. Priya Patel requested leave approval", time: "18 min ago" },
  { text: "Pharmacy stock low: Paracetamol 500mg", time: "1 hr ago" },
  { text: "Monthly billing report is ready", time: "3 hr ago" },
];

const messages = [
  {
    from: "Dr. Rajesh Sharma",
    text: "Can you review the OT schedule for tomorrow?",
    time: "5 min ago",
  },
  {
    from: "Neha Singh (Reception)",
    text: "Patient Anjali Mehta rescheduled to 2 PM",
    time: "22 min ago",
  },
  {
    from: "Billing Dept",
    text: "Invoice #INV-1258 flagged for review",
    time: "1 hr ago",
  },
];

export default function Topbar({ user, onMenuClick }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
      if (msgRef.current && !msgRef.current.contains(e.target))
        setMsgOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sutrasync_user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim())
      alert(
        `Searching for "${search}" across patients, doctors, appointments...`,
      );
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <Menu size={22} />
          </button>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md"
          >
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients, doctors, appointments, invoices..."
              className="bg-transparent outline-none text-sm w-full"
            />
            <kbd className="text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </form>
        </div>

        <div className="flex items-center gap-5 ml-4">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative text-gray-500 hover:text-gray-700"
            >
              <Bell size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20">
                <div className="px-4 py-1.5 text-sm font-semibold text-gray-700 border-b border-gray-100">
                  Notifications
                </div>
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-blue-700 font-medium py-2">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={msgRef}>
            <button
              onClick={() => setMsgOpen((o) => !o)}
              className="relative text-gray-500 hover:text-gray-700"
            >
              <MessageSquare size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-blue-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {messages.length}
              </span>
            </button>
            {msgOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20">
                <div className="px-4 py-1.5 text-sm font-semibold text-gray-700 border-b border-gray-100">
                  Messages
                </div>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {m.from}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{m.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.time}</p>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-blue-700 font-medium py-2">
                  View all messages
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => alert("Calendar view would open here")}
            className="text-gray-500 hover:text-gray-700"
          >
            <Calendar size={20} />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen((p) => !p)}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
                {(user?.name || "Admin User").charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold text-gray-800">
                  {user?.name || "Admin User"}
                </div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                <button
                  onClick={() => {
                    setProfileModalOpen(true);
                    setProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <User size={15} /> My Profile
                </button>
                <button
                  onClick={() => alert("Account settings page would open here")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2"
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {profileModalOpen && (
        <ProfileModal user={user} onClose={() => setProfileModalOpen(false)} />
      )}
    </>
  );
}
