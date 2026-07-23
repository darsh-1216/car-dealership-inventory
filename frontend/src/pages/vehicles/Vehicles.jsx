import { useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import VehicleTable from "../../components/vehicles/VehicleTable";
import Pagination from "../../components/ui/Pagination";
import { getVehicles } from "../../services/vehicle.service";

const PAGE_SIZE = 10;

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      setVehicles(await getVehicles());
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return vehicles;

    return vehicles.filter((vehicle) => [vehicle.make, vehicle.model, vehicle.category]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term)));
  }, [vehicles, search]);

  const totalPages = Math.max(Math.ceil(filteredVehicles.length / PAGE_SIZE), 1);
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  if (loading) return <LoadingSpinner label="Loading vehicles..." />;
  if (error) return <ErrorState message={error} onRetry={loadVehicles} />;

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600">Browse your current vehicle inventory.</p>
        </div>
        <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs" onChange={handleSearch} placeholder="Search make, model, category" type="search" value={search} />
      </div>
      {filteredVehicles.length === 0 ? (
        <EmptyState description={search ? "Try a different make, model, or category." : "Vehicles will appear here once they are available."} title={search ? "No matching vehicles" : "No vehicles found"} />
      ) : (
        <>
          <VehicleTable vehicles={paginatedVehicles} />
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
        </>
      )}
    </section>
  );
}

export default Vehicles;
