require("dotenv").config();

const mongoose = require("mongoose");
const { connectToDatabase } = require("../config/database");
const { Vehicle } = require("../models/Vehicle");

const vehicles = [
  // Toyota
  {
    make: "Toyota",
    model: "Glanza",
    year: 2023,
    category: "Hatchback",
    price: 820000,
    quantity: 6,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Manual",
    status: "Available",
  },
  {
    make: "Toyota",
    model: "Urban Cruiser Hyryder",
    year: 2024,
    category: "SUV",
    price: 1840000,
    quantity: 4,
    mileage: 6500,
    fuelType: "Hybrid",
    transmission: "Automatic",
    status: "Available",
  },

  // Honda
  {
    make: "Honda",
    model: "City",
    year: 2022,
    category: "Sedan",
    price: 1250000,
    quantity: 5,
    mileage: 22000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "Honda",
    model: "Elevate",
    year: 2024,
    category: "SUV",
    price: 1620000,
    quantity: 3,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Manual",
    status: "Available",
  },

  // Hyundai
  {
    make: "Hyundai",
    model: "i20",
    year: 2023,
    category: "Hatchback",
    price: 910000,
    quantity: 8,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Manual",
    status: "Available",
  },
  {
    make: "Hyundai",
    model: "Verna",
    year: 2024,
    category: "Sedan",
    price: 1540000,
    quantity: 4,
    mileage: 7000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    category: "SUV",
    price: 1780000,
    quantity: 6,
    mileage: 18000,
    fuelType: "Diesel",
    transmission: "Automatic",
    status: "Available",
  },

  // Tata
  {
    make: "Tata",
    model: "Altroz",
    year: 2022,
    category: "Hatchback",
    price: 780000,
    quantity: 7,
    mileage: 26000,
    fuelType: "Diesel",
    transmission: "Manual",
    status: "Available",
  },
  {
    make: "Tata",
    model: "Tigor",
    year: 2023,
    category: "Sedan",
    price: 860000,
    quantity: 4,
    mileage: 14000,
    fuelType: "CNG",
    transmission: "Manual",
    status: "Available",
  },
  {
    make: "Tata",
    model: "Nexon",
    year: 2024,
    category: "SUV",
    price: 1490000,
    quantity: 9,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    status: "Available",
  },

  // Mahindra
  {
    make: "Mahindra",
    model: "XUV 3XO",
    year: 2024,
    category: "SUV",
    price: 1690000,
    quantity: 5,
    mileage: 4500,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "Mahindra",
    model: "Scorpio-N",
    year: 2023,
    category: "SUV",
    price: 2240000,
    quantity: 3,
    mileage: 16000,
    fuelType: "Diesel",
    transmission: "Manual",
    status: "Available",
  },

  // Maruti Suzuki
  {
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2023,
    category: "Hatchback",
    price: 760000,
    quantity: 10,
    mileage: 20000,
    fuelType: "Petrol",
    transmission: "Manual",
    status: "Available",
  },
  {
    make: "Maruti Suzuki",
    model: "Ciaz",
    year: 2022,
    category: "Sedan",
    price: 1190000,
    quantity: 2,
    mileage: 28000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },

  // Kia and MG
  {
    make: "Kia",
    model: "Sonet",
    year: 2024,
    category: "SUV",
    price: 1420000,
    quantity: 6,
    mileage: 6000,
    fuelType: "Diesel",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "MG",
    model: "Astor",
    year: 2023,
    category: "SUV",
    price: 1710000,
    quantity: 3,
    mileage: 17500,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },

  // Premium vehicles
  {
    make: "BMW",
    model: "3 Series Gran Limousine",
    year: 2022,
    category: "Sedan",
    price: 5450000,
    quantity: 2,
    mileage: 19000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "Mercedes-Benz",
    model: "GLA",
    year: 2023,
    category: "SUV",
    price: 5200000,
    quantity: 1,
    mileage: 11000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
  {
    make: "Audi",
    model: "A4",
    year: 2021,
    category: "Sedan",
    price: 4200000,
    quantity: 0,
    mileage: 32000,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Sold",
  },
  {
    make: "Audi",
    model: "Q3",
    year: 2024,
    category: "SUV",
    price: 5050000,
    quantity: 2,
    mileage: 3500,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  },
];

async function seedVehicles() {
  if (process.env.SEED_CONFIRM !== "true") {
    throw new Error("Refusing to replace vehicles. Run with SEED_CONFIRM=true.");
  }

  await connectToDatabase();
  const deleted = await Vehicle.deleteMany({});
  const inserted = await Vehicle.insertMany(vehicles);

  console.log(`Seed complete: removed ${deleted.deletedCount} vehicle(s) and inserted ${inserted.length} vehicle(s).`);
}

async function run() {
  try {
    await seedVehicles();
  } catch (error) {
    console.error("Vehicle seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  seedVehicles,
  vehicles,
};
