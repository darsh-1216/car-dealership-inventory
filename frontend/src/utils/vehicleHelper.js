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

export function getEnrichedVehicle(vehicle) {
  if (!vehicle) return vehicle;

  const category = vehicle.category || "SUV";
  const images = vehicleImages[category] || vehicleImages.SUV;

  const idStr = String(vehicle.id || vehicle._id || vehicle.model || "");
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
    year: vehicle.year ?? null,
    fuelType: vehicle.fuelType ?? null,
    transmission: vehicle.transmission ?? null,
    mileage: vehicle.mileage ?? null,
    status: vehicle.status || (vehicle.quantity > 0 ? "Available" : "Sold"),
  };
}
