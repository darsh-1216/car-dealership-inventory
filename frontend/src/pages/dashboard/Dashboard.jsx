import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles } from "../../services/vehicle.service";
import VehicleImage from "../../components/vehicles/VehicleImage";
import useAuth from "../../hooks/useAuth";
import { getEnrichedVehicle } from "../../utils/vehicleHelper";

function Dashboard() {
  const { isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getVehicles();
        setVehicles(data.map(getEnrichedVehicle));
      } catch (err) {
        setError("Failed to load dashboard metrics. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = useMemo(() => {
    const totalVehicles = vehicles.length;
    const availableVehicles = vehicles.filter(
      (v) => (v.status || "Available") === "Available" && v.quantity > 0
    ).length;
    const outOfStockVehicles = vehicles.filter((v) => v.quantity === 0).length;
    const soldVehicles = vehicles.filter((v) => v.status === "Sold").length;
    const totalInventoryValue = vehicles.reduce(
      (acc, v) => acc + (v.price || 0) * (v.quantity || 0),
      0
    );

    const lowStockVehicles = vehicles.filter((v) => v.quantity > 0 && v.quantity <= 3);
    const recentVehicles = [...vehicles].slice(-5).reverse();

    return {
      totalVehicles,
      availableVehicles,
      outOfStockVehicles,
      soldVehicles,
      totalInventoryValue,
      lowStockVehicles,
      recentVehicles,
    };
  }, [vehicles]);

  const formatPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="h-28 animate-pulse rounded-2xl bg-slate-100" key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Live inventory overview and performance metrics.</p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Vehicles</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{stats.totalVehicles}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Available</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-700">{stats.availableVehicles}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Out of Stock</p>
          <p className="mt-2 text-3xl font-extrabold text-amber-700">{stats.outOfStockVehicles}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sold</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-700">{stats.soldVehicles}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Inventory Value</p>
          <p className="mt-2 text-2xl font-extrabold text-blue-700 truncate">
            {formatPrice.format(stats.totalInventoryValue)}
          </p>
        </div>
      </div>

      {/* Detail Tables Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Vehicles */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Vehicles</h2>
            <Link className="text-xs font-semibold text-blue-600 hover:text-blue-700" to="/vehicles">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentVehicles.length === 0 ? (
              <p className="py-4 text-xs text-slate-400">No vehicles available.</p>
            ) : (
              stats.recentVehicles.map((vehicle) => (
                <div className="flex items-center justify-between py-3" key={vehicle.id}>
                  <div className="flex items-center gap-3">
                    <VehicleImage
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="h-10 w-12 rounded-lg bg-slate-100 object-cover"
                      src={vehicle.imageUrl}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-xs text-slate-400">
                        {vehicle.category} • {vehicle.year}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatPrice.format(vehicle.price)}</p>
                    <span
                      className={`inline-block text-[10px] font-semibold ${
                        vehicle.quantity > 0 ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {vehicle.quantity > 0 ? `${vehicle.quantity} in stock` : "Out of stock"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Vehicles */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Low Stock Vehicles (≤ 3)</h2>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              {stats.lowStockVehicles.length} items
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.lowStockVehicles.length === 0 ? (
              <p className="py-4 text-xs text-slate-400">All vehicles have adequate stock levels.</p>
            ) : (
              stats.lowStockVehicles.map((vehicle) => (
                <div className="flex items-center justify-between py-3" key={vehicle.id}>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-slate-400">{vehicle.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                      {vehicle.quantity} remaining
                    </span>
                    {isAdmin && (
                      <Link
                        className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        to={`/vehicles/${vehicle.id}/edit`}
                      >
                        Restock
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
