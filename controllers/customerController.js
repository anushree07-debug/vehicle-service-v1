const Customer = require("../models/Customer");

// CREATE CUSTOMER
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = new Customer({
      name,
      email,
      phone,
      address
    });

    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: savedCustomer
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating customer",
      error: error.message
    });
  }
};

// GET ALL CUSTOMERS
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      customers: customers
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching customers",
      error: error.message
    });
  }
};

// GET ONE CUSTOMER
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      customer: customer
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching customer",
      error: error.message
    });
  }
};

// UPDATE CUSTOMER
const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        address
      },
      {
        new: true
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: customer
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating customer",
      error: error.message
    });
  }
};

// DELETE CUSTOMER
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting customer",
      error: error.message
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
