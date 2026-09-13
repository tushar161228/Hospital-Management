import { Search, User } from "lucide-react";

export default function PatientSelector({ patients, search, onSearchChange, selectedPatient, onSelect }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Select Patient</h3>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3">
        <Search size={15} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search patient..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {patients.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
              selectedPatient?.id === p.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {p.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
              <p className="text-xs text-gray-400">{p.age} yrs • {p.gender}</p>
            </div>
          </button>
        ))}
        {patients.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No patients found.</p>
        )}
      </div>
    </div>
  );
}