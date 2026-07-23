import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import VehicleCardSkeletons from "../../components/vehicles/VehicleCardSkeleton";
import VehicleFilters from "../../components/vehicles/VehicleFilters";
import VehicleGrid from "../../components/vehicles/VehicleGrid";
import Pagination from "../../components/ui/Pagination";
import useAuth from "../../hooks/useAuth";
import { getVehicles } from "../../services/vehicle.service";

const PAGE_SIZE = 12;

function Vehicles() {
  const { isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
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
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !term ||
        [vehicle.make, vehicle.model, vehicle.category]
          .filter(Boolean)
          .some((val) => val.toLowerCase().includes(term));

      const vehicleStatus = vehicle.status || (vehicle.quantity > 0 ? "Available" : "Sold");
      const matchesStatus = !status || vehicleStatus === status;
      const matchesCategory = !category || vehicle.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [vehicles, search, status, category]);

  const categories = useMemo(() => [...new Set(vehicles.map((v) => v.category).filter(Boolean))].sort(), [vehicles]);

  const totalPages = Math.max(Math.ceil(filteredVehicles.length / PAGE_SIZE), 1);
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  if (loading) return <VehicleCardSkeletons />;
  if (error) return <ErrorState message={error} onRetry={loadVehicles} />;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Vehicle Inventory</h1>
          <p className="text-sm text-slate-500">Browse, search, and manage current dealership inventory.</p>
        </div>
        {isAdmin && (
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition"
            to="/vehicles/add"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            Add Vehicle
          </Link>
        )}
      </div>

      <VehicleFilters
        categories={categories}
        category={category}
        onCategoryChange={handleFilterChange(setCategory)}
        onSearchChange={handleSearch}
        onStatusChange={handleFilterChange(setStatus)}
        search={search}
        status={status}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filteredVehicles.length}</span> vehicle
          {filteredVehicles.length === 1 ? "" : "s"}
        </p>
      </div>

      {filteredVehicles.length === 0 ? (
        <EmptyState
          description={
            search || category || status
              ? "Try adjusting your search terms or filter selection."
              : "Vehicles will appear here once inventory is available."
          }
          title={search || category || status ? "No matching vehicles" : "No vehicles found"}
        />
      ) : (
        <>
          <VehicleGrid onRefresh={loadVehicles} vehicles={paginatedVehicles} />
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
          )}
        </>
      )}
    </section>
  );
}

export default Vehicles;
