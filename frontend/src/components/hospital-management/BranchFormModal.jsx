import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { generateBranchId } from "../../data/hospitalManagementData";

const emptyForm = { name: "", address: "", phone: "" };
const emptyFacilities = {
  opd: { total: "", occupied: 0 },
  ipd: { total: "", occupied: 0 },
  icu: { total: "", occupied: 0 },
  ot: { total: "", occupied: 0 },
};

export default function BranchFormModal({ mode, branch, existingBranches, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [facilities, setFacilities] = useState(emptyFacilities);

  useEffect(() => {
    if (mode === "edit" && branch) {
      setForm({ name: branch.name, address: branch.address, phone: branch.phone });
      setFacilities(
        Object.fromEntries(Object.entries(branch.facilities).map(([k, v]) => [k, { total: String(v.total), occupied: v.occupied }]))
      );
    } else {
      setForm(emptyForm);
      setFacilities(emptyFacilities);
    }
  }, [mode, branch]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFacilityChange = (key, value) => {
    setFacilities((prev) => ({ ...prev, [key]: { ...prev[key], total: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address) {
      alert("Please fill branch name and address");
      return;
    }

    const finalFacilities = Object.fromEntries(
      Object.entries(facilities).map(([k, v]) => [k, { total: Number(v.total) || 0, occupied: v.occupied }])
    );

    if (mode === "add") {
      onSave({ ...form, id: generateBranchId(existingBranches), isMainBranch: false, facilities: finalFacilities });
    } else {
      onSave({ ...branch, ...form, facilities: finalFacilities });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-5">{mode === "add" ? "Add Branch" : "Edit Branch"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Branch Name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

          <div>
            <p className="text-xs text-gray-500 mb-2">Total Bed/Room Capacity</p>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min="0" value={facilities.opd.total} onChange={(e) => handleFacilityChange("opd", e.target.value)} placeholder="OPD" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
              <input type="number" min="0" value={facilities.ipd.total} onChange={(e) => handleFacilityChange("ipd", e.target.value)} placeholder="IPD" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
              <input type="number" min="0" value={facilities.icu.total} onChange={(e) => handleFacilityChange("icu", e.target.value)} placeholder="ICU" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
              <input type="number" min="0" value={facilities.ot.total} onChange={(e) => handleFacilityChange("ot", e.target.value)} placeholder="OT" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">{mode === "add" ? "Add Branch" : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}