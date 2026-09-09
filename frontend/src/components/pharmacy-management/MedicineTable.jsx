import { useState, useRef, useEffect } from "react";
import { MoreVertical, PackagePlus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { isExpiringSoon, isLowStock } from "../../data/pharmacyManagementData";

export default function MedicineTable({ medicines, onAdjustStock, onEdit, onDelete }) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (medicines.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No medicines match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Medicine ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Unit Price</th>
              <th className="px-4 py-3 font-medium">Expiry</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => {
              const lowStock = isLowStock(med);
              const expiringSoon = isExpiringSoon(med.expiryDate);
              return (
                <tr key={med.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${lowStock || expiringSoon ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{med.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-400">{med.genericName} • {med.manufacturer}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{med.category}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${lowStock ? "text-red-500" : "text-gray-800"}`}>{med.stock}</span>
                    {lowStock && (
                      <span className="ml-1.5 inline-flex items-center gap-1 text-xs text-red-500">
                        <AlertTriangle size={11} /> Low
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">₹{med.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={expiringSoon ? "text-red-500 font-medium" : "text-gray-600"}>{med.expiryDate}</span>
                    {expiringSoon && (
                      <span className="ml-1.5 inline-flex items-center gap-1 text-xs text-red-500">
                        <AlertTriangle size={11} /> Expiring
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right relative">
                    <button onClick={() => setMenuOpenFor(menuOpenFor === med.id ? null : med.id)}>
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                    {menuOpenFor === med.id && (
                      <div ref={menuRef} className="absolute right-4 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left">
                        <button onClick={() => { onAdjustStock(med); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                          <PackagePlus size={14} /> Adjust Stock
                        </button>
                        <button onClick={() => { onEdit(med); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                          <Pencil size={14} /> Edit Medicine
                        </button>
                        <button onClick={() => { onDelete(med); setMenuOpenFor(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}