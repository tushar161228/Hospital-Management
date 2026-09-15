const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: Number,
    gender: String,
    phone: { type: String, required: true },
    email: String,
    address: String,
    bloodGroup: String,
    assignedDoctor: String,
    department: String,
    registeredOn: String,
    lastVisit: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);