const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const { connectToDatabase } = require("./config/database");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/vehicles", async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await connectToDatabase();
    }
    return require("./routes/vehicle.routes")(req, res, next);
  } catch (error) {
    return next(error);
  }
});

// Health check endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
