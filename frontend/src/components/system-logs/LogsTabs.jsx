export default function LogsTabs({ active, onChange }) {
  const tabs = [{ id: "login", label: "Login Logs" }, { id: "audit", label: "Audit Logs" }];
  return (
    <div className="flex gap-2 border-b border-gray-200 mb-5">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${active === t.id ? "border-blue-700 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}