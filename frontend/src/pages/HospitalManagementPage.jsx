import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import BranchCard from "../components/hospital-management/BranchCard";
import BranchFormModal from "../components/hospital-management/BranchFormModal";
import { initialBranches } from "../data/hospitalManagementData";

export default function HospitalManagementPage() {
  const [branches, setBranches] = useState(initialBranches);
  const [formModal, setFormModal] = useState(null);
  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const handleSave = (branchData) => {
    setBranches((prev) => {
      const exists = prev.some((b) => b.id === branchData.id);
      return exists ? prev.map((b) => (b.id === branchData.id ? branchData : b)) : [...prev, branchData];
    });
  };

  const handleDelete = (branch) => {
    if (confirm(`Delete "${branch.name}"? This cannot be undone.`)) {
      setBranches((prev) => prev.filter((b) => b.id !== branch.id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hospital Management</h1>
              <p className="text-sm text-gray-400 mt-0.5">Home &gt; Hospital Management</p>
            </div>
            <button onClick={() => setFormModal({ mode: "add", branch: null })} className="flex items-center gap-2 bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition">
              <Plus size={16} /> Add Branch
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {branches.map((b) => (
              <BranchCard key={b.id} branch={b} onEdit={(br) => setFormModal({ mode: "edit", branch: br })} onDelete={handleDelete} />
            ))}
          </div>
        </main>
      </div>

      {formModal && (
        <BranchFormModal mode={formModal.mode} branch={formModal.branch} existingBranches={branches} onClose={() => setFormModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}