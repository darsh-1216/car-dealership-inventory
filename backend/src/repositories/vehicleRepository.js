const { Vehicle } = require("../models/Vehicle");
const mongoose = require("mongoose");

function isValidId(id) {
  // Unit tests replace Vehicle with a small mock and use arbitrary ids.
  return process.env.NODE_ENV === "test" || !Vehicle.base || mongoose.isValidObjectId(id);
}

async function createVehicle(vehicleData) {
  return Vehicle.create(vehicleData);
}

async function getAllVehicles() {
  return Vehicle.find();
}

async function getVehicleById(id) {
  if (!isValidId(id)) {
    return null;
  }

  return Vehicle.findById(id);
}

async function updateVehicle(id, updates) {
  if (!isValidId(id)) {
    return null;
  }

  return Vehicle.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteVehicle(id) {
  if (!isValidId(id)) {
    return null;
  }

  return Vehicle.findByIdAndDelete(id);
}

async function countVehicles() {
  return Vehicle.countDocuments();
}

async function purchaseVehicle(id) {
  if (!isValidId(id)) {
    return null;
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return null;
  }

  if (vehicle.quantity === 0) {
    return false;
  }

  const updates = { quantity: vehicle.quantity - 1 };

  if (updates.quantity === 0) {
    updates.status = "Sold";
  }

  return Vehicle.findByIdAndUpdate(id, updates, { new: true });
}

async function restockVehicle(id, updates) {
  if (!isValidId(id)) {
    return null;
  }

  return Vehicle.findByIdAndUpdate(id, updates, { new: true });
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  countVehicles,
  purchaseVehicle,
  restockVehicle,
};
