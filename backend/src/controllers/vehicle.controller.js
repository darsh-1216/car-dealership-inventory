const vehicleService = require("../services/vehicleService");

const toLegacyVehicle = (vehicle) => {
  const result = {
    id: vehicle.id || Number.parseInt(String(vehicle._id).slice(-6), 16),
    make: vehicle.make,
    model: vehicle.model,
    category: vehicle.category,
    price: vehicle.price,
    quantity: vehicle.quantity,
  };

  if (vehicle.year !== undefined) result.year = vehicle.year;
  if (vehicle.mileage !== undefined) result.mileage = vehicle.mileage;
  if (vehicle.fuelType !== undefined) result.fuelType = vehicle.fuelType;
  if (vehicle.transmission !== undefined) result.transmission = vehicle.transmission;
  if (vehicle.status !== undefined && vehicle.year !== undefined) result.status = vehicle.status;

  return result;
};

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

exports.createVehicle = async (req, res) => {
  const validationError = validateVehicleInput(req, res);

  if (validationError) {
    return validationError;
  }

  try {
    await vehicleService.createVehicle(req.body);
    return res.status(201).json({ message: "Vehicle created successfully" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getVehicleCount = async (req, res) => {
  try {
    const totalVehicles = await vehicleService.getVehicleCount();

    return res.status(200).json({
      totalVehicles,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehicles();

    const { page, limit } = req.query;

    if (page === undefined && limit === undefined) {
      return res.status(200).json(vehicles.map(toLegacyVehicle));
    }

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || vehicles.length;

    const total = vehicles.length;
    const totalPages = Math.max(Math.ceil(total / parsedLimit), 1);

    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = startIndex + parsedLimit;

    return res.status(200).json({
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages,
      data: vehicles.slice(startIndex, endIndex).map(toLegacyVehicle),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const { make, model, category } = req.query;
    const vehicles = await vehicleService.getVehicles();
    const filteredVehicles = vehicles.filter((vehicle) =>
      (!make || vehicle.make === make) &&
      (!model || vehicle.model === model) &&
      (!category || vehicle.category === category)
    );

    return res.status(200).json(filteredVehicles.map(toLegacyVehicle));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicle(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    return res.status(200).json(toLegacyVehicle(vehicle));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateVehicle = async (req, res) => {
  const validationError = validateVehicleInput(req, res);

  if (validationError) {
    return validationError;
  }

  try {
    const vehicle = await vehicleService.updateVehicle(
      req.params.id,
      req.body
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    return res.status(200).json(toLegacyVehicle(vehicle));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.deleteVehicle(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.purchaseVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.purchaseVehicle(req.params.id);

    if (vehicle === null) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    if (vehicle === false) {
      return res.status(400).json({
        message: "Vehicle is out of stock",
      });
    }

    return res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.restockVehicle = async (req, res) => {
  const { quantity } = req.body;

  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({
      message: "Restock quantity must be greater than 0",
    });
  }

  try {
    const vehicle = await vehicleService.restockVehicle(req.params.id, quantity);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    return res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
