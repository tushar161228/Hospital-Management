import { initialDoctors } from "./doctorManagementData";
import { initialAppointments } from "./appointmentManagementData";
import { initialInvoices } from "./billingManagementData";
import { initialPrescriptions } from "./prescriptionManagementData";

export function getDoctorPerformance() {
  return initialDoctors.map((doc) => {
    const appts = initialAppointments.filter((a) => a.doctor === doc.name);
    const completed = appts.filter((a) => a.status === "Completed").length;
    const revenue = initialInvoices
      .filter((inv) => inv.doctor === doc.name)
      .reduce((sum, inv) => sum + inv.paidAmount, 0);
    return {
      name: doc.name,
      department: doc.department,
      totalAppointments: appts.length,
      completed,
      revenue,
      rating: (4 + Math.random() * 0.9).toFixed(1),
    };
  });
}

export function getAppointmentStats() {
  const byStatus = {};
  initialAppointments.forEach((a) => {
    byStatus[a.status] = (byStatus[a.status] || 0) + 1;
  });
  return byStatus;
}

export function getRevenueByDepartment() {
  const byDept = {};
  initialInvoices.forEach((inv) => {
    const doc = initialDoctors.find((d) => d.name === inv.doctor);
    const dept = doc?.department || "Other";
    byDept[dept] = (byDept[dept] || 0) + inv.paidAmount;
  });
  return byDept;
}

export function getPrescriptionVolume() {
  const medCounts = {};
  initialPrescriptions.forEach((rx) => {
    rx.medicines.forEach((m) => {
      medCounts[m.name] = (medCounts[m.name] || 0) + 1;
    });
  });
  return Object.entries(medCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}