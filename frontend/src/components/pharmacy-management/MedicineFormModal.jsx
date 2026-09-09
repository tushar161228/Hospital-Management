import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { medicineCategories, generateMedicineId } from "../../data/pharmacyManagementData";

const emptyForm = {
  name: "", genericName: "", category: "", manufacturer: "",
  stock: "", reorderLevel: "", unitPrice: "", expiryDate: "",
};

export default function MedicineFormModal({ mode, medicine, existingMedicines, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && medicine) {
      setForm({
        ...medicine,
        stock: String(medicine.stock),
        reorderLevel: String(medicine.reorderLevel),
        unitPrice: String(medicine.unitPrice),
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, medicine]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.stock || !form.unitPrice || !form.expiryDate) {
      alert("Please fill all required fields");
      return;
    }

    const medicineData = {
      ...form,
      stock: Number(form.stock),
      reorderLevel: Number(form.reorderLevel) || 0,
      unitPrice: Number(form.unitPrice),
    };

    if (mode === "add") {
      onSave({ ...medicineData, id: generateMedicineId(existingMedicines) });
    } else {
      onSave(medicineData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-5">
          {mode === "add" ? "Add Medicine" : "Edit Medicine"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Medicine Name" required className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="Generic Name" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <select name="category" value={form.category} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700">
              <option value="">Select Category</option>
              {medicineCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <input name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="Manufacturer" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="Current Stock" required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="reorderLevel" type="number" min="0" value={form.reorderLevel} onChange={handleChange} placeholder="Reorder Level" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />

            <input name="unitPrice" type="number" min="0" step="0.01" value={form.unitPrice} onChange={handleChange} placeholder="Unit Price (₹)" required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
            <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              {mode === "add" ? "Add Medicine" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}