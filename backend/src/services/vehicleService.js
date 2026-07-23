const {
  createVehicle: createVehicleInRepository,
  getAllVehicles: getAllVehiclesInRepository,
  getVehicleById: getVehicleByIdInRepository,
  updateVehicle: updateVehicleInRepository,
  deleteVehicle: deleteVehicleInRepository,
  countVehicles: countVehiclesInRepository,
  purchaseVehicle: purchaseVehicleInRepository,
  restockVehicle: restockVehicleInRepository,
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

async function purchaseVehicle(id) {
  return purchaseVehicleInRepository(id);
}

async function restockVehicle(id, quantity) {
  const vehicle = await getVehicleByIdInRepository(id);

  if (!vehicle) {
    return null;
  }

  const updates = {
    quantity: vehicle.quantity + quantity,
  };

  if (vehicle.status === "Sold" && updates.quantity > 0) {
    updates.status = "Available";
  }

  return restockVehicleInRepository(id, updates);
}

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleCount,
  purchaseVehicle,
  restockVehicle,
};
