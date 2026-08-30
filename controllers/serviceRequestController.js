const ServiceRequest = require("../models/ServiceRequest");

// CREATE
const createServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.create(req.body);

    res.status(201).json({
      message: "Service request created successfully",
      serviceRequest: serviceRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating service request",
      error: error.message
    });
  }
};

// GET ALL
const getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find();

    res.status(200).json({
      message: "Service requests fetched successfully",
      serviceRequests: serviceRequests
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching service requests",
      error: error.message
    });
  }
};

// GET ONE
const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest =
      await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found"
      });
    }

    res.status(200).json({
      message: "Service request fetched successfully",
      serviceRequest: serviceRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching service request",
      error: error.message
    });
  }
};

// UPDATE
const updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest =
      await ServiceRequest.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found"
      });
    }

    res.status(200).json({
      message: "Service request updated successfully",
      serviceRequest: serviceRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating service request",
      error: error.message
    });
  }
};

// DELETE
const deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest =
      await ServiceRequest.findByIdAndDelete(
        req.params.id
      );

    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found"
      });
    }

    res.status(200).json({
      message: "Service request deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting service request",
      error: error.message
    });
  }
};

module.exports = {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest
};
