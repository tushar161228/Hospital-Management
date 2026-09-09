import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, RotateCcw, Download } from "lucide-react";

const statusStyles = {
  Paid: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  "Partially Paid": "bg-blue-50 text-blue-600",
  Refunded: "bg-red-50 text-red-600",
};

export default function InvoiceTable({
  invoices,
  onView,
  onRefund,
  onDownload,
}) {
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No invoices match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">Invoice ID</th>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Doctor</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Paid</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
              >
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {inv.id}
                </td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {inv.patient}
                </td>
                <td className="px-4 py-3 text-gray-600">{inv.doctor}</td>
                <td className="px-4 py-3 text-gray-600">{inv.date}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  ₹{inv.total.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  ₹{inv.paidAmount.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button
                    onClick={() =>
                      setMenuOpenFor(menuOpenFor === inv.id ? null : inv.id)
                    }
                  >
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {menuOpenFor === inv.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-4 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-left"
                    >
                      <button
                        onClick={() => {
                          onView(inv);
                          setMenuOpenFor(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Eye size={14} /> View Invoice
                      </button>
                      <button
                        onClick={() => {
                          onDownload(inv);
                          setMenuOpenFor(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Download size={14} /> Download CSV
                      </button>
                      {inv.status !== "Refunded" && (
                        <button
                          onClick={() => {
                            onRefund(inv);
                            setMenuOpenFor(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-50"
                        >
                          <RotateCcw size={14} /> Process Refund
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
