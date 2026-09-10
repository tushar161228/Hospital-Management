import { useState } from "react";
import { Save } from "lucide-react";

export default function NotificationSettings({ settings, onSave }) {
  const [form, setForm] = useState(settings);
  const [dirty, setDirty] = useState(false);

  const toggle = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
    setDirty(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave(form);
    setDirty(false);
    alert("Notification settings saved successfully.");
  };

  const toggles = [
    { key: "emailEnabled", label: "Email Notifications", desc: "Send notifications to doctors, staff, and patients via email." },
    { key: "smsEnabled", label: "SMS Notifications", desc: "Send appointment reminders and alerts via SMS." },
    { key: "pushEnabled", label: "Push Notifications", desc: "In-app push notifications for the doctor and staff apps." },
    { key: "emergencyAlertsEnabled", label: "Emergency Alert Broadcast", desc: "High-priority push/SMS for emergency cases (bypasses quiet hours)." },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Email & SMS Settings</h3>
        <p className="text-sm text-gray-500">Configure notification channels and gateway settings.</p>
      </div>

      <div className="space-y-3">
        {toggles.map((t) => (
          <label key={t.key} className="flex items-start justify-between gap-3 border border-gray-100 rounded-lg p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-gray-800">{t.label}</p>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </div>
            <input
              type="checkbox"
              checked={form[t.key]}
              onChange={() => toggle(t.key)}
              className="w-5 h-5 accent-blue-700 shrink-0 mt-0.5"
            />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">SMTP Host</label>
          <input
            value={form.smtpHost}
            onChange={(e) => handleChange("smtpHost", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">SMS Gateway Provider</label>
          <input
            value={form.smsGateway}
            onChange={(e) => handleChange("smsGateway", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
      </div>

      {dirty && (
        <button onClick={handleSave} className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition">
          <Save size={15} /> Save Changes
        </button>
      )}
    </div>
  );
}