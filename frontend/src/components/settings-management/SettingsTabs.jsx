const tabs = [
  { id: "hospital", label: "Hospital Info" },
  { id: "branding", label: "Branding & Theme" },
  { id: "notifications", label: "Email & SMS" },
  { id: "backup", label: "Backup" },
];

export default function SettingsTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-200 mb-5 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition ${
            active === tab.id
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}