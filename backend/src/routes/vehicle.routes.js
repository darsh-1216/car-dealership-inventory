const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/auth.middleware");

const {
  createVehicle,
  getVehicleCount,
  getVehicles,
  searchVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} = require("../controllers/vehicle.controller");

const router = express.Router();

// Create Vehicle (Admin Only)
router.post("/", authMiddleware, authorizeRoles("admin"), createVehicle);

// Get All Vehicles
router.get("/", authMiddleware, getVehicles);

// Search Vehicles
router.get("/search", authMiddleware, searchVehicles);

// Get Vehicle Count
router.get("/count", authMiddleware, getVehicleCount);

// Get Vehicle By ID
router.get("/:id", authMiddleware, getVehicleById);

// Update Vehicle (Admin Only)
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateVehicle);

// Delete Vehicle (Admin Only)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteVehicle);

// Purchase Vehicle
router.post("/:id/purchase", authMiddleware, purchaseVehicle);

// Restock Vehicle (Admin Only)
router.post("/:id/restock", authMiddleware, authorizeRoles("admin"), restockVehicle);

module.exports = router;
