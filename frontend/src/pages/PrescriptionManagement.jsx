import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import PrescriptionFilters from "../components/prescription-management/PrescriptionFilters";
import PrescriptionTable from "../components/prescription-management/PrescriptionTable";
import PrescriptionViewModal from "../components/prescription-management/PrescriptionViewModal";
import MedicineMasterList from "../components/prescription-management/MedicineMasterList";
import { initialPrescriptions } from "../data/prescriptionManagementData";

export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [search, setSearch] = useState("");
  const [doctor, setDoctor] = useState("");
  const [status, setStatus] = useState("");
  const [viewRx, setViewRx] = useState(null);

  const user = JSON.parse(localStorage.getItem("sutrasync_user") || "null");

  const filtered = prescriptions.filter((rx) => {
    const matchesSearch =
      !search ||
      rx.patient.toLowerCase().includes(search.toLowerCase()) ||
      rx.id.toLowerCase().includes(search.toLowerCase());
    const matchesDoctor = !doctor || rx.doctor === doctor;
    const matchesStatus = !status || rx.status === status;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const handleSign = (rx) => {
    setPrescriptions((prev) =>
      prev.map((r) => (r.id === rx.id ? { ...r, status: "Signed" } : r))
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar user={user} />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Prescription Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Home &gt; Prescriptions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <PrescriptionFilters
                search={search} onSearchChange={setSearch}
                doctor={doctor} onDoctorChange={setDoctor}
                status={status} onStatusChange={setStatus}
              />
              <PrescriptionTable prescriptions={filtered} onView={setViewRx} />
            </div>

            <div className="lg:col-span-1">
              <MedicineMasterList />
            </div>
          </div>
        </main>
      </div>

      {viewRx && (
        <PrescriptionViewModal prescription={viewRx} onClose={() => setViewRx(null)} onSign={handleSign} />
      )}
    </div>
  );
}