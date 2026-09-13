import { Search } from "lucide-react";

export default function DoctorPatientFilters({ search, onSearchChange }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs mb-5">
      <Search size={16} className="text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search my patients..."
        className="outline-none text-sm w-full"
      />
    </div>
  );
}