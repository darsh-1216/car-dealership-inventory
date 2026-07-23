import VehicleCard from "./VehicleCard";

function VehicleGrid({ vehicles, onRefresh }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} onRefresh={onRefresh} />
      ))}
    </div>
  );
}

export default VehicleGrid;
