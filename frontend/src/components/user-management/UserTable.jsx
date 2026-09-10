import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Ban, CheckCircle2, KeyRound, ShieldCheck } from "lucide-react";

export default function UserTable({ users, onEdit, onToggleStatus, onResetPassword, onToggle2FA }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (users.length === 0) {
    return <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">No users match your filters.</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Last Login</th>
              <th className="px-4 py-3 font-medium">2FA</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{u.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.role}</td>
                <td className="px-4 py-3 text-gray-600">{u.lastLogin}</td>
                <td className="px-4 py-3">
                  {u.twoFactorEnabled ? (
                    <span className="flex items-center gap-1 text-xs text-green-600"><ShieldCheck size={12} /> Enabled</span>
                  ) : (
                    <span className="text-xs text-gray-400">Disabled</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button onClick={() => setMenuOpenFor(menuOpenFor === u.id ? null : u.id)}><MoreVertical size={16} className="text-gray-400" /></button>
                  {menuOpenFor === u.id && (
                    <div ref={menuRef} className="absolute right-4 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                      <button onClick={() => { onEdit(u); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"><Pencil size={14} /> Edit User</button>
                      <button onClick={() => { onResetPassword(u); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"><KeyRound size={14} /> Reset Password</button>
                      <button onClick={() => { onToggle2FA(u); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"><ShieldCheck size={14} /> {u.twoFactorEnabled ? "Disable" : "Enable"} 2FA</button>
                      <button onClick={() => { onToggleStatus(u); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                        {u.status === "Active" ? <Ban size={14} /> : <CheckCircle2 size={14} />} {u.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}