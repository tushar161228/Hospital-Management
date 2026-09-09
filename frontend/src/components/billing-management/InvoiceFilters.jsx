import { Search, Plus } from "lucide-react";
import { invoiceStatuses } from "../../data/billingManagementData";

export default function InvoiceFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onCreateInvoice,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by invoice ID, patient..."
            className="outline-none text-sm w-full"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">All Status</option>
          {invoiceStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onCreateInvoice}
        className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition shrink-0"
      >
        <Plus size={16} />
        Create Invoice
      </button>
    </div>
  );
}
