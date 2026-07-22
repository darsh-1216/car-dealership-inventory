const vehicles = require("../data/vehicles");

exports.createVehicle = (req, res) => {
  const { make, model, category, price, quantity } = req.body;

  if (!make) {
    return res.status(400).json({ message: "Make is required" });
  }

  if (!model) {
    return res.status(400).json({ message: "Model is required" });
  }

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  if (price === undefined || price === null) {
    return res.status(400).json({ message: "Price is required" });
  }

  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ message: "Quantity is required" });
  }

  vehicles.push({ make, model, category, price, quantity });

  return res.status(201).json({ message: "Vehicle created successfully" });
};

exports.getVehicles = (req, res) => {
  return res.status(200).json(vehicles);
};
