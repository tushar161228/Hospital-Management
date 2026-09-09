import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import MedicineFilters from "../components/pharmacy-management/MedicineFilters";
import MedicineTable from "../components/pharmacy-management/MedicineTable";
import MedicineFormModal from "../components/pharmacy-management/MedicineFormModal";
import StockAdjustModal from "../components/pharmacy-management/StockAdjustModal";
import { initialMedicines, isExpiringSoon, isLowStock } from "../data/pharmacyManagementData";

export default function PharmacyManagement() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [stockModalFor, setStockModalFor] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = medicines.filter((m) => {
    const matchesSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || m.category === category;
    const matchesStock =
      !stockFilter ||
      (stockFilter === "low" && isLowStock(m)) ||
      (stockFilter === "expiring" && isExpiringSoon(m.expiryDate));
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleSave = (medData) => {
    setMedicines((prev) => {
      const exists = prev.some((m) => m.id === medData.id);
      return exists
        ? prev.map((m) => (m.id === medData.id ? medData : m))
        : [...prev, medData];
    });
  };

  const handleDelete = (med) => {
    if (confirm(`Delete "${med.name}" from the medicine list?`)) {
      setMedicines((prev) => prev.filter((m) => m.id !== med.id));
    }
  };

  const handleAdjustStock = (med, delta) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === med.id ? { ...m, stock: m.stock + delta } : m))
    );
  };

  const lowStockCount = medicines.filter(isLowStock).length;
  const expiringCount = medicines.filter((m) => isExpiringSoon(m.expiryDate)).length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Pharmacy Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Pharmacy</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Total Medicines</p>
              <p className="text-xl font-bold text-gray-800">{medicines.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Low Stock</p>
              <p className="text-xl font-bold text-red-500">{lowStockCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Expiring Soon</p>
              <p className="text-xl font-bold text-amber-600">{expiringCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Stock Value</p>
              <p className="text-xl font-bold text-gray-800">
                ₹{medicines.reduce((sum, m) => sum + m.stock * m.unitPrice, 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <MedicineFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            onAddMedicine={() => setFormModal({ mode: "add", medicine: null })}
          />

          <MedicineTable
            medicines={filtered}
            onAdjustStock={setStockModalFor}
            onEdit={(m) => setFormModal({ mode: "edit", medicine: m })}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {formModal && (
        <MedicineFormModal
          mode={formModal.mode}
          medicine={formModal.medicine}
          existingMedicines={medicines}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}

      {stockModalFor && (
        <StockAdjustModal
          medicine={stockModalFor}
          onClose={() => setStockModalFor(null)}
          onAdjust={handleAdjustStock}
        />
      )}
    </div>
  );
}