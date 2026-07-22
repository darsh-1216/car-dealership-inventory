const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createVehicle, getVehicles } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);

module.exports = router;
