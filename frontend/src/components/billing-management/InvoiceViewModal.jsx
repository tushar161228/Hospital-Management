import { X, ShieldCheck } from "lucide-react";

const statusStyles = {
  Paid: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  "Partially Paid": "bg-blue-50 text-blue-600",
  Refunded: "bg-red-50 text-red-600",
};

export default function InvoiceViewModal({ invoice, onClose }) {
  if (!invoice) return null;
  const balance = invoice.total - invoice.paidAmount;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{invoice.id}</h2>
            <p className="text-sm text-gray-500">{invoice.date}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[invoice.status]}`}>
            {invoice.status}
          </span>
        </div>

        <div className="text-sm mb-4">
          <p><span className="text-gray-400">Patient:</span> {invoice.patient} ({invoice.patientId})</p>
          <p><span className="text-gray-400">Doctor:</span> {invoice.doctor}</p>
        </div>

        <div className="border-t border-b border-gray-100 py-3 mb-3 space-y-1.5">
          {invoice.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="text-gray-800">₹{item.amount.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1 text-sm mb-4">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-700">Total</span>
            <span className="text-gray-800">₹{invoice.total.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Paid</span>
            <span className="text-green-600">₹{invoice.paidAmount.toLocaleString("en-IN")}</span>
          </div>
          {balance > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Balance Due</span>
              <span className="text-red-500">₹{balance.toLocaleString("en-IN")}</span>
            </div>
          )}
          {invoice.paymentMode && (
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Mode</span>
              <span className="text-gray-700">{invoice.paymentMode}</span>
            </div>
          )}
        </div>

        {invoice.insuranceClaim && (
          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2.5 mb-4">
            <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-blue-700">Insurance Claim — {invoice.insuranceClaim.status}</p>
              <p className="text-blue-600">{invoice.insuranceClaim.provider} • {invoice.insuranceClaim.claimId}</p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}