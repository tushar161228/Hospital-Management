const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 });
  res.json(patients);
};

exports.createPatient = async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    const patientId = `PAT-${2001 + count}`;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const patient = await Patient.create({
      ...req.body,
      patientId,
      registeredOn: today,
      lastVisit: today,
    });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json(patient);
};

exports.deletePatient = async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json({ message: "Patient deleted" });
};

exports.togglePatientStatus = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  patient.status = patient.status === "Active" ? "Inactive" : "Active";
  await patient.save();
  res.json(patient);
};