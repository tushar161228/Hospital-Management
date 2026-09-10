import { useState } from "react";
import { Save, Upload } from "lucide-react";
import logo from "../../assets/logo.png";
import { themeOptions, languageOptions } from "../../data/settingsData";

export default function BrandingSettings({ branding, onSave }) {
  const [form, setForm] = useState(branding);
  const [dirty, setDirty] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave(form);
    setDirty(false);
    alert("Branding settings saved successfully.");
  };

  const handleLogoUpload = () => {
    alert("Logo upload would open a file picker here — new logo replaces the current one across the platform.");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Branding & Theme</h3>
        <p className="text-sm text-gray-500">Customize your hospital's logo, color theme, and language.</p>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Hospital Logo</label>
        <div className="flex items-center gap-4">
          <img src={logo} alt="Current logo" className="w-14 h-14 rounded-lg border border-gray-200 p-1" />
          <button
            onClick={handleLogoUpload}
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Upload size={15} /> Upload New Logo
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Primary Brand Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={form.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <span className="text-sm text-gray-600 font-mono">{form.primaryColor}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Currently applied: Blue (#1d4ed8), matching your platform's theme.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Theme</label>
          <select
            value={form.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            {themeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Language</label>
          <select
            value={form.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            {languageOptions.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
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