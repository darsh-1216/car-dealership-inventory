const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/auth.middleware");
const { createVehicle, getVehicleCount, getVehicles, searchVehicles, getVehicleById, updateVehicle, deleteVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicles);
router.get("/count", authMiddleware, getVehicleCount);
router.get("/:id", authMiddleware, getVehicleById);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateVehicle);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteVehicle);

module.exports = router;
