import { Building2, Phone, MapPin, Star, Pencil, Trash2 } from "lucide-react";
import FacilityOverview from "./FacilityOverview";

export default function BranchCard({ branch, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Building2 size={20} />
        </div>
        {branch.isMainBranch && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            <Star size={11} fill="currentColor" /> Main Branch
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-800 mb-1">{branch.name}</h3>
      <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
        <MapPin size={12} /> {branch.address}
      </p>
      <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
        <Phone size={12} /> {branch.phone}
      </p>

      <FacilityOverview facilities={branch.facilities} />

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button onClick={() => onEdit(branch)} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-600 hover:bg-gray-50">
          <Pencil size={13} /> Edit
        </button>
        {!branch.isMainBranch && (
          <button onClick={() => onDelete(branch)} className="flex items-center justify-center border border-gray-200 rounded-lg py-1.5 px-2.5 text-xs text-red-600 hover:bg-red-50">
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </div>
  );
}