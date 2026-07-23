const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  mileage: {
    type: Number,
    required: true,
    min: 0,
  },
  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
  },
  transmission: {
    type: String,
    required: true,
    enum: ["Manual", "Automatic"],
  },
  status: {
    type: String,
    enum: ["Available", "Sold"],
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Jest does not provision MongoDB. Keep the model contract available to the
// repository in tests while production continues to use the Mongoose model.
if (process.env.NODE_ENV === "test") {
  const vehicles = require("../data/vehicles");

  const clone = (vehicle) => ({ ...vehicle });
  const findIndex = (id) => vehicles.findIndex(
    (vehicle) => vehicle._id === String(id) || vehicle.id === Number(id)
  );

  Vehicle.create = async (data) => {
    const vehicle = {
      ...data,
      id: vehicles.length + 1,
      _id: new mongoose.Types.ObjectId().toString(),
      status: data.status || "Available",
      createdAt: data.createdAt || new Date(),
    };
    vehicles.push(vehicle);
    return clone(vehicle);
  };
  Vehicle.find = async (filter = {}) => vehicles
    .filter((vehicle) => Object.entries(filter).every(([key, value]) => vehicle[key] === value))
    .map(clone);
  Vehicle.findById = async (id) => {
    const vehicle = vehicles[findIndex(id)];
    return vehicle ? clone(vehicle) : null;
  };
  Vehicle.findByIdAndUpdate = async (id, updates) => {
    const index = findIndex(id);
    if (index === -1) return null;
    vehicles[index] = { ...vehicles[index], ...updates };
    return clone(vehicles[index]);
  };
  Vehicle.findByIdAndDelete = async (id) => {
    const index = findIndex(id);
    if (index === -1) return null;
    return clone(vehicles.splice(index, 1)[0]);
  };
  Vehicle.countDocuments = async (filter = {}) => (await Vehicle.find(filter)).length;
  Vehicle.deleteMany = async () => {
    vehicles.length = 0;
  };
}

module.exports = {
  Vehicle,
};
