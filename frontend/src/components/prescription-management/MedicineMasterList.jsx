import { useState } from "react";
import { Search, Pill, AlertTriangle } from "lucide-react";
import { medicineMaster } from "../../data/prescriptionManagementData";

export default function MedicineMasterList() {
  const [search, setSearch] = useState("");

  const filtered = medicineMaster.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Medicine Master & Drug Reference</h3>

      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-4">
        <Search size={15} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search medicine or generic name..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filtered.map((m, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start gap-2.5 mb-1.5">
              <Pill size={15} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">{m.name}</p>
                <p className="text-xs text-gray-400">Generic: {m.generic}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 ml-6">Dosage: {m.dosageGuide}</p>
            <p className="text-xs text-amber-600 flex items-start gap-1 ml-6 mt-1">
              <AlertTriangle size={11} className="mt-0.5 shrink-0" />
              {m.interactions}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No medicines found.</p>
        )}
      </div>
    </div>
  );
}