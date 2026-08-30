const express = require("express");

const router = express.Router();

const {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest
} = require("../controllers/serviceRequestController");

router.post("/", createServiceRequest);

router.get("/", getServiceRequests);

router.get("/:id", getServiceRequestById);

router.put("/:id", updateServiceRequest);

router.delete("/:id", deleteServiceRequest);

module.exports = router;
