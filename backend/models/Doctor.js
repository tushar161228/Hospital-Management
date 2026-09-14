const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true, unique: true },
    empId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    department: String,
    specialization: String,
    qualification: String,
    license: String,
    experience: Number,
    consultationFee: Number,
    branch: String,
    room: String,
    workingDays: [String],
    workingHours: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    username: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);