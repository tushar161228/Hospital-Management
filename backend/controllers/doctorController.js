const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json(doctors);
};

exports.createDoctor = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    const doctorId = `DOC-${1001 + count}`;
    const empId = `EMP-${4501 + count}`;
    const doctor = await Doctor.create({ ...req.body, doctorId, empId });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
};

exports.deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json({ message: "Doctor deleted" });
};

exports.toggleDoctorStatus = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  doctor.status = doctor.status === "Active" ? "Inactive" : "Active";
  await doctor.save();
  res.json(doctor);
};