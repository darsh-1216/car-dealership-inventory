const express = require("express");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const vehicleRoutes = require("./routes/vehicle.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Health check endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
