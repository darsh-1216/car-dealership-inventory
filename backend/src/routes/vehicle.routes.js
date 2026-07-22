const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createVehicle, getVehicles, searchVehicles, updateVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicles);
router.put("/:id", authMiddleware, updateVehicle);

module.exports = router;
