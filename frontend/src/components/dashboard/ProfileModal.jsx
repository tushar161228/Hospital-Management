import { X, Mail, Shield, Building2 } from "lucide-react";

export default function ProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center text-2xl font-semibold mb-3">
            {(user?.name || "Admin User").charAt(0)}
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            {user?.name || "Admin User"}
          </h2>
          <p className="text-sm text-gray-400">{user?.role || "Super Admin"}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={16} className="text-gray-400" />
            {user?.email || "admin@sutrasync.com"}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Shield size={16} className="text-gray-400" />
            Access level: {user?.role || "Super Admin"}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Building2 size={16} className="text-gray-400" />
            Sutra Sync Hospital
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-teal-700 text-white py-2.5 rounded-lg font-medium hover:bg-teal-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
