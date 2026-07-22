const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", authMiddleware, createVehicle);

module.exports = router;
