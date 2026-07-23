const vehicleImages = {
  SUV: [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  ],
  Sedan: [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
  ],
  Hatchback: [
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
  ],
  Luxury: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
  ],
  Truck: [
    "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80",
  ],
};

const defaultSpecsByModel = {
  "Fortuner": { year: 2023, fuelType: "Diesel", transmission: "Automatic", mileage: 15000 },
  "Glanza": { year: 2023, fuelType: "Petrol", transmission: "Manual", mileage: 12000 },
  "Urban Cruiser Hyryder": { year: 2024, fuelType: "Hybrid", transmission: "Automatic", mileage: 6500 },
  "City": { year: 2022, fuelType: "Petrol", transmission: "Automatic", mileage: 22000 },
  "Elevate": { year: 2024, fuelType: "Petrol", transmission: "Manual", mileage: 8000 },
  "i20": { year: 2023, fuelType: "Petrol", transmission: "Manual", mileage: 15000 },
  "Verna": { year: 2024, fuelType: "Petrol", transmission: "Automatic", mileage: 7000 },
  "Creta": { year: 2023, fuelType: "Diesel", transmission: "Automatic", mileage: 18000 },
  "Altroz": { year: 2022, fuelType: "Diesel", transmission: "Manual", mileage: 26000 },
  "Tigor": { year: 2023, fuelType: "CNG", transmission: "Manual", mileage: 14000 },
  "Nexon": { year: 2024, fuelType: "Electric", transmission: "Automatic", mileage: 5000 },
  "XUV 3XO": { year: 2024, fuelType: "Petrol", transmission: "Automatic", mileage: 4500 },
  "Scorpio-N": { year: 2023, fuelType: "Diesel", transmission: "Manual", mileage: 16000 },
  "Swift": { year: 2023, fuelType: "Petrol", transmission: "Manual", mileage: 20000 },
  "Ciaz": { year: 2022, fuelType: "Petrol", transmission: "Automatic", mileage: 28000 },
  "Sonet": { year: 2024, fuelType: "Diesel", transmission: "Automatic", mileage: 6000 },
  "Astor": { year: 2023, fuelType: "Petrol", transmission: "Automatic", mileage: 17500 },
  "3 Series Gran Limousine": { year: 2022, fuelType: "Petrol", transmission: "Automatic", mileage: 19000 },
  "GLA": { year: 2023, fuelType: "Petrol", transmission: "Automatic", mileage: 11000 },
  "A4": { year: 2021, fuelType: "Petrol", transmission: "Automatic", mileage: 32000 },
  "Q3": { year: 2024, fuelType: "Petrol", transmission: "Automatic", mileage: 3500 },
};

export function getEnrichedVehicle(vehicle) {
  if (!vehicle) return vehicle;

  const modelSpecs = defaultSpecsByModel[vehicle.model] || {};
  const category = vehicle.category || "SUV";
  const images = vehicleImages[category] || vehicleImages.SUV;

  const idStr = String(vehicle.id || vehicle._id || vehicle.model);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = (hash << 5) - hash + idStr.charCodeAt(i);
    hash |= 0;
  }
  const imageIndex = Math.abs(hash) % images.length;
  const defaultImage = images[imageIndex];

  return {
    ...vehicle,
    imageUrl: vehicle.imageUrl || vehicle.image || defaultImage,
    year: vehicle.year ?? modelSpecs.year ?? 2023,
    fuelType: vehicle.fuelType ?? modelSpecs.fuelType ?? "Petrol",
    transmission: vehicle.transmission ?? modelSpecs.transmission ?? "Automatic",
    mileage: vehicle.mileage ?? modelSpecs.mileage ?? 15000,
    status: vehicle.status || (vehicle.quantity > 0 ? "Available" : "Sold"),
  };
}
