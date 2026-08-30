const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true
    },

    problem: {
      type: String,
      required: true
    },

    serviceDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);
