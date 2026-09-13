export default function VitalsForm({ vitals, onChange }) {
  const fields = [
    { key: "bp", label: "Blood Pressure", placeholder: "120/80 mmHg" },
    { key: "pulse", label: "Pulse", placeholder: "72 bpm" },
    { key: "temp", label: "Temperature", placeholder: "98.6 °F" },
    { key: "weight", label: "Weight", placeholder: "70 kg" },
    { key: "spo2", label: "SpO2", placeholder: "98%" },
    { key: "height", label: "Height", placeholder: "170 cm" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Vitals</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs text-gray-500 mb-1 block">{f.label}</label>
            <input
              value={vitals[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}