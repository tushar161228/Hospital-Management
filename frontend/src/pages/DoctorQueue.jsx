import { useState } from "react";
import DoctorSidebar from "../components/doctor-dashboard/DoctorSidebar";
import DoctorTopbar from "../components/doctor-dashboard/DoctorTopbar";
import CallNextBanner from "../components/doctor-queue/CallNextBanner";
import QueueCard from "../components/doctor-queue/QueueCard";
import { patientQueue as initialQueue } from "../data/doctorDashboardData";

export default function DoctorQueue() {
  const [queue, setQueue] = useState(initialQueue);
  const [completed, setCompleted] = useState([]);
  const [activePatientId, setActivePatientId] = useState(null);

  const activePatient = queue.find((p) => p.position === activePatientId);
  const nextPatient = !activePatientId ? queue[0] : null;

  const handleCallNext = () => {
    if (queue.length > 0) setActivePatientId(queue[0].position);
  };

  const handleCallIn = (patient) => {
    setActivePatientId(patient.position);
  };

  const handleComplete = (patient) => {
    setCompleted((prev) => [...prev, patient]);
    setQueue((prev) => prev.filter((p) => p.position !== patient.position));
    setActivePatientId(null);
  };

  const handleSkip = (patient) => {
    setQueue((prev) => {
      const rest = prev.filter((p) => p.position !== patient.position);
      return [...rest, patient];
    });
    if (activePatientId === patient.position) setActivePatientId(null);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DoctorSidebar />
      <div className="flex-1 min-w-0">
        <DoctorTopbar />
        <main className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Today's Queue</h1>
            <p className="text-gray-500 mt-1">{queue.length} waiting • {completed.length} completed today</p>
          </div>

          <CallNextBanner nextPatient={nextPatient} onCallNext={handleCallNext} />

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Waiting Queue</h3>
            {queue.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No patients in queue.</p>
            ) : (
              <div className="space-y-2">
                {queue.map((p, idx) => (
                  <QueueCard
                    key={p.position}
                    patient={p}
                    index={idx}
                    isActive={activePatientId === p.position}
                    onCallIn={handleCallIn}
                    onComplete={handleComplete}
                    onSkip={handleSkip}
                  />
                ))}
              </div>
            )}
          </div>

          {completed.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mt-5">
              <h3 className="font-semibold text-gray-800 mb-3">Completed Today</h3>
              <div className="space-y-2">
                {completed.map((p) => (
                  <div key={p.position} className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-gray-700">{p.patient}</span>
                    <span className="text-green-600 text-xs font-medium">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}