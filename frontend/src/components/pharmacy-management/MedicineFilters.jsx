import { Search, Plus } from "lucide-react";
import { medicineCategories } from "../../data/pharmacyManagementData";

export default function MedicineFilters({ search, onSearchChange, category, onCategoryChange, stockFilter, onStockFilterChange, onAddMedicine }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search medicine, generic name..."
            className="outline-none text-sm w-full"
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">All Categories</option>
          {medicineCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">All Stock</option>
          <option value="low">Low Stock</option>
          <option value="expiring">Expiring Soon</option>
        </select>
      </div>

      <button
        onClick={onAddMedicine}
        className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition shrink-0"
      >
        <Plus size={16} />
        Add Medicine
      </button>
    </div>
  );
}