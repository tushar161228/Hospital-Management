const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getDoctors, createDoctor, updateDoctor, deleteDoctor, toggleDoctorStatus,
} = require("../controllers/doctorController");

router.get("/", protect, getDoctors);
router.post("/", protect, createDoctor);
router.put("/:id", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);
router.patch("/:id/toggle-status", protect, toggleDoctorStatus);

module.exports = router;