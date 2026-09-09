import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import InvoiceFilters from "../components/billing-management/InvoiceFilters";
import InvoiceTable from "../components/billing-management/InvoiceTable";
import InvoiceFormModal from "../components/billing-management/InvoiceFormModal";
import InvoiceViewModal from "../components/billing-management/InvoiceViewModal";
import { initialInvoices } from "../data/billingManagementData";

export default function BillingManagement() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      !search ||
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.patient.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || inv.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const handleRefund = (invoice) => {
    if (confirm(`Process refund of ₹${invoice.paidAmount.toLocaleString("en-IN")} for ${invoice.patient}?`)) {
      setInvoices((prev) =>
        prev.map((i) => (i.id === invoice.id ? { ...i, status: "Refunded" } : i))
      );
    }
  };

  const handleDownload = (invoice) => {
    const rows = [
      ["Invoice ID", invoice.id],
      ["Patient", invoice.patient],
      ["Doctor", invoice.doctor],
      ["Date", invoice.date],
      [],
      ["Item", "Amount"],
      ...invoice.items.map((i) => [i.label, i.amount]),
      [],
      ["Total", invoice.total],
      ["Paid", invoice.paidAmount],
      ["Status", invoice.status],
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${invoice.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalRevenue = invoices.filter((i) => i.status !== "Refunded").reduce((sum, i) => sum + i.paidAmount, 0);
  const totalPending = invoices.reduce((sum, i) => sum + (i.total - i.paidAmount), 0);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar user={user} />

        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Billing & Invoices</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Billing & Invoices</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Total Invoices</p>
              <p className="text-xl font-bold text-gray-800">{invoices.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Total Collected</p>
              <p className="text-xl font-bold text-green-600">₹{totalRevenue.toLocaleString("en-IN")}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Pending Balance</p>
              <p className="text-xl font-bold text-amber-600">₹{totalPending.toLocaleString("en-IN")}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Refunded</p>
              <p className="text-xl font-bold text-red-500">{invoices.filter((i) => i.status === "Refunded").length}</p>
            </div>
          </div>

          <InvoiceFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            onCreateInvoice={() => setFormOpen(true)}
          />

          <InvoiceTable
            invoices={filtered}
            onView={setViewInvoice}
            onRefund={handleRefund}
            onDownload={handleDownload}
          />
        </main>
      </div>

      {formOpen && (
        <InvoiceFormModal
          existingInvoices={invoices}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
        />
      )}

      {viewInvoice && (
        <InvoiceViewModal invoice={viewInvoice} onClose={() => setViewInvoice(null)} />
      )}
    </div>
  );
}