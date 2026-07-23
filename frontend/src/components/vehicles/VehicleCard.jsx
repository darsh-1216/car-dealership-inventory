import { useState } from "react";
import { Link } from "react-router-dom";
import VehicleImage from "./VehicleImage";
import { purchaseVehicle } from "../../services/vehicle.service";

function VehicleCard({ vehicle, onRefresh }) {
  const [purchasing, setPurchasing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState(null);

  const status = vehicle.status || (vehicle.quantity > 0 ? "Available" : "Sold");
  const isAvailable = status === "Available" && vehicle.quantity > 0;

  const formatPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const handlePurchase = async () => {
    if (!isAvailable || purchasing) return;
    try {
      setPurchasing(true);
      setMessage(null);
      await purchaseVehicle(vehicle.id);
      setMessage({ type: "success", text: "Vehicle purchased successfully!" });
      if (onRefresh) onRefresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to purchase vehicle.",
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
        <div>
          <div className="relative">
            <VehicleImage
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-48 w-full rounded-none bg-slate-100 object-cover"
              src={vehicle.imageUrl || vehicle.image}
            />
            <span
              className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-md ${
                isAvailable
                  ? "bg-emerald-500/90 text-white"
                  : status === "Sold" || vehicle.quantity === 0
                  ? "bg-slate-700/90 text-white"
                  : "bg-amber-500/90 text-white"
              }`}
            >
              {isAvailable ? "Available" : vehicle.quantity === 0 ? "Out of Stock" : status}
            </span>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {vehicle.make} {vehicle.model}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {vehicle.year || "N/A"}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500">{vehicle.category || "General"}</span>
                </div>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-slate-100 py-3 text-xs">
              <div>
                <dt className="text-slate-400 font-normal">Fuel Type</dt>
                <dd className="mt-0.5 font-semibold text-slate-700">{vehicle.fuelType || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-normal">Transmission</dt>
                <dd className="mt-0.5 font-semibold text-slate-700">{vehicle.transmission || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-normal">Mileage</dt>
                <dd className="mt-0.5 font-semibold text-slate-700">
                  {vehicle.mileage != null ? `${vehicle.mileage.toLocaleString("en-IN")} km` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 font-normal">Stock</dt>
                <dd className={`mt-0.5 font-semibold ${vehicle.quantity > 0 ? "text-slate-700" : "text-red-500"}`}>
                  {vehicle.quantity != null ? `${vehicle.quantity} in stock` : "0"}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">Price</p>
                <p className="text-xl font-extrabold text-slate-900">
                  {vehicle.price != null ? formatPrice.format(vehicle.price) : "N/A"}
                </p>
              </div>
            </div>

            {message && (
              <p
                className={`mt-3 rounded-lg p-2 text-xs font-medium ${
                  message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-5 pt-0">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
            onClick={() => setShowDetails(true)}
            type="button"
          >
            View
          </button>
          <Link
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
            to={`/vehicles/${vehicle.id}/edit`}
          >
            Edit
          </Link>
          <button
            className={`flex items-center justify-center rounded-xl py-2 text-xs font-bold text-white transition active:scale-95 ${
              isAvailable
                ? "bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200"
                : "cursor-not-allowed bg-slate-300"
            }`}
            disabled={!isAvailable || purchasing}
            onClick={handlePurchase}
            type="button"
          >
            {purchasing ? "Buying..." : "Purchase"}
          </button>
        </div>
      </article>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-150">
            <div className="relative">
              <VehicleImage
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-56 w-full object-cover bg-slate-100"
                src={vehicle.imageUrl || vehicle.image}
              />
              <button
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow hover:bg-white"
                onClick={() => setShowDetails(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">{vehicle.category} • {vehicle.year}</p>
                </div>
                <p className="text-2xl font-extrabold text-blue-600">{formatPrice.format(vehicle.price)}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-400">Fuel Type</p>
                  <p className="text-sm font-semibold text-slate-800">{vehicle.fuelType || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Transmission</p>
                  <p className="text-sm font-semibold text-slate-800">{vehicle.transmission || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Mileage</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {vehicle.mileage != null ? `${vehicle.mileage.toLocaleString("en-IN")} km` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Stock Available</p>
                  <p className="text-sm font-semibold text-slate-800">{vehicle.quantity} units</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={() => setShowDetails(false)}
                  type="button"
                >
                  Close
                </button>
                {isAvailable && (
                  <button
                    className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    disabled={purchasing}
                    onClick={() => {
                      handlePurchase();
                      setShowDetails(false);
                    }}
                    type="button"
                  >
                    Purchase Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VehicleCard;
