import { Search } from "lucide-react";

export default function DoctorAppointmentFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  date,
  onDateChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by patient name..."
          className="outline-none text-sm w-full"
        />
      </div>

      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
      >
        <option value="">All Status</option>
        <option value="Pending Approval">Pending Approval</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Rescheduled">Rescheduled</option>
      </select>
    </div>
  );
}
