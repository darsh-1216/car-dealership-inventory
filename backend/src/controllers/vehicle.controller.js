const vehicles = require("../data/vehicles");

const requiredFieldMessages = {
  make: "Make is required",
  model: "Model is required",
  category: "Category is required",
  price: "Price is required",
  quantity: "Quantity is required",
};

const validateVehicleInput = (req, res) => {
  const fields = ["make", "model", "category", "price", "quantity"];

  for (const field of fields) {
    if (field === "price" || field === "quantity") {
      if (req.body[field] === undefined || req.body[field] === null) {
        return res.status(400).json({
          message: requiredFieldMessages[field],
        });
      }
    } else if (!req.body[field]) {
      return res.status(400).json({
        message: requiredFieldMessages[field],
      });
    }
  }

  return null;
};

exports.createVehicle = (req, res) => {
  const validationError = validateVehicleInput(req, res);

  if (validationError) {
    return validationError;
  }

  const { make, model, category, price, quantity } = req.body;

  const id = vehicles.length + 1;

  vehicles.push({
    id,
    make,
    model,
    category,
    price,
    quantity,
  });

  return res.status(201).json({
    message: "Vehicle created successfully",
  });
};

exports.getVehicles = (req, res) => {
  return res.status(200).json(vehicles);
};

exports.searchVehicles = (req, res) => {
  const { make, category } = req.query;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesMake = !make || vehicle.make === make;
    const matchesCategory = !category || vehicle.category === category;

    return matchesMake && matchesCategory;
  });

  return res.status(200).json(filteredVehicles);
};

exports.updateVehicle = (req, res) => {
  const validationError = validateVehicleInput(req, res);

  if (validationError) {
    return validationError;
  }

  const { id } = req.params;

  const vehicle = vehicles.find(
    (vehicle) => vehicle.id === Number(id)
  );

  if (!vehicle) {
    return res.status(404).json({
      message: "Vehicle not found",
    });
  }

  const { make, model, category, price, quantity } = req.body;

  vehicle.make = make;
  vehicle.model = model;
  vehicle.category = category;
  vehicle.price = price;
  vehicle.quantity = quantity;

  return res.status(200).json(vehicle);
};

exports.deleteVehicle = (req, res) => {
  const { id } = req.params;
  const vehicleIndex = vehicles.findIndex(
    (vehicle) => vehicle.id === Number(id)
  );

  if (vehicleIndex === -1) {
    return res.status(404).json({
      message: "Vehicle not found",
    });
  }

  vehicles.splice(vehicleIndex, 1);

  return res.status(200).json({
    message: "Vehicle deleted successfully",
  });
};