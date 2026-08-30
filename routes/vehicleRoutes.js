const express = require("express");

const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicleController");

// CREATE
router.post("/", createVehicle);

// GET ALL
router.get("/", getVehicles);

// GET ONE
router.get("/:id", getVehicleById);

// UPDATE
router.put("/:id", updateVehicle);

// DELETE
router.delete("/:id", deleteVehicle);

module.exports = router;
