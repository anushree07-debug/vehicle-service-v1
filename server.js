const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");

const app = express();

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Vehicle Service Management API is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
