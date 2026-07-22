const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// Health check endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
