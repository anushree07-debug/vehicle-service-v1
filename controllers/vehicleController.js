const Vehicle = require("../models/Vehicle");

// CREATE VEHICLE
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: vehicle
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating vehicle",
      error: error.message
    });
  }
};

// GET ALL VEHICLES
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json({
      message: "Vehicles fetched successfully",
      vehicles: vehicles
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching vehicles",
      error: error.message
    });
  }
};

// GET VEHICLE BY ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      message: "Vehicle fetched successfully",
      vehicle: vehicle
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching vehicle",
      error: error.message
    });
  }
};

// UPDATE VEHICLE
const updateVehicle = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, model, customerId } = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        vehicleNumber,
        vehicleType,
        model,
        customerId
      },
      {
        new: true
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: vehicle
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating vehicle",
      error: error.message
    });
  }
};

// DELETE VEHICLE
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      message: "Vehicle deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting vehicle",
      error: error.message
    });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
