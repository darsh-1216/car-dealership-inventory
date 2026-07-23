const { Vehicle } = require("../models/Vehicle");

async function createVehicle(vehicleData) {
  return Vehicle.create(vehicleData);
}

async function getAllVehicles() {
  return Vehicle.find();
}

async function getVehicleById(id) {
  return Vehicle.findById(id);
}

async function updateVehicle(id, updates) {
  return Vehicle.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteVehicle(id) {
  return Vehicle.findByIdAndDelete(id);
}

async function countVehicles() {
  return Vehicle.countDocuments();
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  countVehicles,
};
