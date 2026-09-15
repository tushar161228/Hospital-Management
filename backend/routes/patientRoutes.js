const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getPatients, createPatient, updatePatient, deletePatient, togglePatientStatus,
} = require("../controllers/patientController");

router.get("/", protect, getPatients);
router.post("/", protect, createPatient);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);
router.patch("/:id/toggle-status", protect, togglePatientStatus);

module.exports = router;