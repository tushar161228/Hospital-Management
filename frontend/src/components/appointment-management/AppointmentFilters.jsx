import { Search, Plus } from "lucide-react";
import { departments } from "../../data/doctorManagementData";
import { appointmentStatuses } from "../../data/appointmentManagementData";

export default function AppointmentFilters({
  search, onSearchChange, department, onDepartmentChange,
  status, onStatusChange, date, onDateChange, onAddAppointment,
}) {
  return (
    <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient, doctor, ID..."
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
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">All Status</option>
          {appointmentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <button
        onClick={onAddAppointment}
        className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition shrink-0"
      >
        <Plus size={16} />
        New / Walk-in Appointment
      </button>
    </div>
  );
}