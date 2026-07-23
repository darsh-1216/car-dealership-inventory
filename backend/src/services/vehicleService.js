const {
  createVehicle: createVehicleInRepository,
  getAllVehicles: getAllVehiclesInRepository,
  getVehicleById: getVehicleByIdInRepository,
  updateVehicle: updateVehicleInRepository,
  deleteVehicle: deleteVehicleInRepository,
  countVehicles: countVehiclesInRepository,
} = require("../repositories/vehicleRepository");

async function createVehicle(vehicleData) {
  return createVehicleInRepository(vehicleData);
}

async function getVehicles() {
  return getAllVehiclesInRepository();
}

async function getVehicle(id) {
  return getVehicleByIdInRepository(id);
}

async function updateVehicle(id, updates) {
  return updateVehicleInRepository(id, updates);
}

async function deleteVehicle(id) {
  return deleteVehicleInRepository(id);
}

async function getVehicleCount() {
  return countVehiclesInRepository();
}

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleCount,
};
