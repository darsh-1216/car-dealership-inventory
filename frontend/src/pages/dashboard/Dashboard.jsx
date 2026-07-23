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
        <div className="h-7 w-40 animate-pulse rounded-lg bg-slate-200" />
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
      <div className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-2xs">
        <p className="text-xs font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-0.5 text-xs text-slate-500 font-medium">Live dealership performance and inventory analytics.</p>
      </div>

      {/* KPI Stat Cards with Deep Emerald Theme */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Vehicles */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs transition-all duration-200 hover:border-emerald-800/30 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Vehicles</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 12h16.5" />
              </svg>
            </div>
          </div>
          <p className="mt-2.5 text-2xl font-extrabold text-slate-900 tracking-tight">{stats.totalVehicles}</p>
        </div>

        {/* Available */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs transition-all duration-200 hover:border-emerald-800/30 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Available</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-2.5 text-2xl font-extrabold text-slate-900 tracking-tight">{stats.availableVehicles}</p>
        </div>

        {/* Out of Stock */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs transition-all duration-200 hover:border-emerald-800/30 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Out of Stock</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <p className="mt-2.5 text-2xl font-extrabold text-slate-900 tracking-tight">{stats.outOfStockVehicles}</p>
        </div>

        {/* Sold */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs transition-all duration-200 hover:border-emerald-800/30 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sold</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </div>
          </div>
          <p className="mt-2.5 text-2xl font-extrabold text-slate-900 tracking-tight">{stats.soldVehicles}</p>
        </div>

        {/* Inventory Value (Deep Luxury Emerald Container) */}
        <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950 p-4.5 text-white shadow-md shadow-emerald-950/20 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Inventory Value</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6" />
              </svg>
            </div>
          </div>
          <p className="mt-2.5 text-xl font-extrabold text-white truncate tracking-tight">
            {formatPrice.format(stats.totalInventoryValue)}
          </p>
        </div>
      </div>

      {/* Detail Tables Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Vehicles */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Vehicles</h2>
            <Link className="text-xs font-bold text-emerald-800 hover:text-emerald-900 transition" to="/vehicles">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentVehicles.length === 0 ? (
              <p className="py-5 text-center text-xs font-medium text-slate-400">No vehicles available.</p>
            ) : (
              stats.recentVehicles.map((vehicle) => (
                <div className="flex items-center justify-between py-3" key={vehicle.id}>
                  <div className="flex items-center gap-3">
                    <VehicleImage
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="h-10 w-12 rounded-lg bg-slate-100 object-cover shadow-2xs"
                      src={vehicle.imageUrl}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {vehicle.category} • {vehicle.year}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900">{formatPrice.format(vehicle.price)}</p>
                    <span
                      className={`inline-block text-[10px] font-bold ${
                        vehicle.quantity > 0 ? "text-emerald-800" : "text-amber-700"
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
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Low Stock Vehicles (≤ 3)</h2>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200/60">
              {stats.lowStockVehicles.length} items
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.lowStockVehicles.length === 0 ? (
              <p className="py-5 text-center text-xs font-medium text-slate-400">All vehicles have adequate stock levels.</p>
            ) : (
              stats.lowStockVehicles.map((vehicle) => (
                <div className="flex items-center justify-between py-3" key={vehicle.id}>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">{vehicle.category}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200/60">
                      {vehicle.quantity} remaining
                    </span>
                    {isAdmin && (
                      <Link
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-95 shadow-2xs"
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
