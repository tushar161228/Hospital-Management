import { Search, Plus } from "lucide-react";
import { radiologyTestTypes } from "../../data/radiologyManagementData";

export default function RadiologyFilters({ search, onSearchChange, testType, onTestTypeChange, status, onStatusChange, onNewRequest }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient, ID..."
            className="outline-none text-sm w-full"
          />
        </div>

        <select value={testType} onChange={(e) => onTestTypeChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
          <option value="">All Test Types</option>
          {radiologyTestTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select value={status} onChange={(e) => onStatusChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
          <option value="">All Status</option>
          <option value="Pending Upload">Pending Upload</option>
          <option value="In Progress">In Progress</option>
          <option value="Report Ready">Report Ready</option>
        </select>
      </div>

      <button
        onClick={onNewRequest}
        className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition shrink-0"
      >
        <Plus size={16} />
        New Radiology Request
      </button>
    </div>
  );
}