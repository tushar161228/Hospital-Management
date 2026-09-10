import { useState } from "react";
import { Save, DatabaseBackup, Download } from "lucide-react";
import { backupFrequencyOptions } from "../../data/settingsData";

export default function BackupSettings({ settings, onSave }) {
  const [form, setForm] = useState(settings);
  const [dirty, setDirty] = useState(false);

  const toggle = () => {
    setForm((prev) => ({ ...prev, autoBackupEnabled: !prev.autoBackupEnabled }));
    setDirty(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave(form);
    setDirty(false);
    alert("Backup settings saved successfully.");
  };

  const handleBackupNow = () => {
    alert("Manual backup started — this would trigger an immediate scheduled data backup.");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Backup Settings</h3>
          <p className="text-sm text-gray-500">Scheduled automatic data backup configuration.</p>
        </div>
        <button
          onClick={handleBackupNow}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <DatabaseBackup size={15} /> Backup Now
        </button>
      </div>

      <label className="flex items-start justify-between gap-3 border border-gray-100 rounded-lg p-3 cursor-pointer">
        <div>
          <p className="text-sm font-medium text-gray-800">Enable Automatic Backup</p>
          <p className="text-xs text-gray-500">Regularly backs up hospital data based on the selected frequency.</p>
        </div>
        <input type="checkbox" checked={form.autoBackupEnabled} onChange={toggle} className="w-5 h-5 accent-blue-700 shrink-0 mt-0.5" />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Backup Frequency</label>
          <select
            value={form.frequency}
            onChange={(e) => handleChange("frequency", e.target.value)}
            disabled={!form.autoBackupEnabled}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 disabled:bg-gray-50 disabled:text-gray-400"
          >
            {backupFrequencyOptions.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Retention Period (days)</label>
          <input
            type="number"
            min="1"
            value={form.retentionDays}
            onChange={(e) => handleChange("retentionDays", Number(e.target.value))}
            disabled={!form.autoBackupEnabled}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">Last Backup</span>
        <span className="text-gray-700 font-medium">{form.lastBackup}</span>
      </div>

      {dirty && (
        <button onClick={handleSave} className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition">
          <Save size={15} /> Save Changes
        </button>
      )}
    </div>
  );
}