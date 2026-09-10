import { Search } from "lucide-react";
import { initialDoctors } from "../../data/prescriptionManagementData";

export default function PrescriptionFilters({ search, onSearchChange, doctor, onDoctorChange, status, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by patient, prescription ID..."
          className="outline-none text-sm w-full"
        />
      </div>

      <select value={doctor} onChange={(e) => onDoctorChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
        <option value="">All Doctors</option>
        {initialDoctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
      </select>

      <select value={status} onChange={(e) => onStatusChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
        <option value="">All Status</option>
        <option value="Signed">Signed</option>
        <option value="Pending">Pending</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  );
}