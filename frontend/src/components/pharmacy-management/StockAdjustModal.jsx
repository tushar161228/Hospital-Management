import { useState } from "react";
import { X } from "lucide-react";

export default function StockAdjustModal({ medicine, onClose, onAdjust }) {
  const [type, setType] = useState("in");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }
    if (type === "out" && qty > medicine.stock) {
      alert("Cannot remove more stock than currently available");
      return;
    }
    onAdjust(medicine, type === "in" ? qty : -qty, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">Adjust Stock</h2>
        <p className="text-sm text-gray-500 mb-5">{medicine.name} — current stock: {medicine.stock}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setType("in")}
              className={`flex-1 py-2 text-sm font-medium ${type === "in" ? "bg-green-50 text-green-600" : "text-gray-500"}`}
            >
              Stock In
            </button>
            <button
              type="button"
              onClick={() => setType("out")}
              className={`flex-1 py-2 text-sm font-medium ${type === "out" ? "bg-red-50 text-red-600" : "text-gray-500"}`}
            >
              Stock Out
            </button>
          </div>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />

          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note (e.g. Purchase Order #, reason)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}