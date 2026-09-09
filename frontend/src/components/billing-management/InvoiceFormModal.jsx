import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { initialPatients, initialDoctors, paymentModes, generateInvoiceId } from "../../data/billingManagementData";

export default function InvoiceFormModal({ existingInvoices, onClose, onSave }) {
  const [patientId, setPatientId] = useState("");
  const [doctor, setDoctor] = useState("");
  const [items, setItems] = useState([{ label: "Consultation Fee", amount: "" }]);
  const [paymentMode, setPaymentMode] = useState("");
  const [markPaid, setMarkPaid] = useState(true);

  const total = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const handleItemChange = (idx, field, value) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { label: "", amount: "" }]);
  const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = initialPatients.find((p) => p.id === patientId);
    if (!patient || !doctor || items.some((i) => !i.label || !i.amount)) {
      alert("Please fill patient, doctor, and all line items");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const newInvoice = {
      id: generateInvoiceId(existingInvoices),
      patient: patient.name,
      patientId: patient.id,
      doctor,
      date: today,
      items: items.map((i) => ({ label: i.label, amount: Number(i.amount) })),
      total,
      paidAmount: markPaid ? total : 0,
      paymentMode: markPaid ? paymentMode || "Cash" : null,
      status: markPaid ? "Paid" : "Pending",
      insuranceClaim: null,
    };

    onSave(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-5">Create Invoice</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Select Patient</option>
            {initialPatients.map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
            ))}
          </select>

          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Select Doctor</option>
            {initialDoctors.map((d) => (
              <option key={d.id} value={d.name}>{d.name} — {d.department}</option>
            ))}
          </select>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Line Items</p>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={item.label}
                    onChange={(e) => handleItemChange(idx, "label", e.target.value)}
                    placeholder="e.g. Consultation, Lab Test"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                  />
                  <input
                    type="number"
                    min="0"
                    value={item.amount}
                    onChange={(e) => handleItemChange(idx, "amount", e.target.value)}
                    placeholder="₹"
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                  />
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1 text-sm text-blue-700 mt-2 hover:underline"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-gray-600">Total Amount</span>
            <span className="text-lg font-bold text-gray-800">₹{total.toLocaleString("en-IN")}</span>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={markPaid} onChange={(e) => setMarkPaid(e.target.checked)} />
            Mark as paid now
          </label>

          {markPaid && (
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Select Payment Mode</option>
              {paymentModes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-800 transition">
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}