const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createVehicle, getVehicles, searchVehicles, getVehicleById, updateVehicle, deleteVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicles);
router.get("/:id", authMiddleware, getVehicleById);
router.put("/:id", authMiddleware, updateVehicle);
router.delete("/:id", authMiddleware, deleteVehicle);

module.exports = router;
