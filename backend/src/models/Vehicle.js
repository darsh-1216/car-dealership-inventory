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

module.exports = {
  Vehicle,
};
