import { useState } from "react";
import { Link } from "react-router-dom";
import VehicleImage from "./VehicleImage";
import useAuth from "../../hooks/useAuth";
import { getEnrichedVehicle } from "../../utils/vehicleHelper";
import { deleteVehicle, purchaseVehicle, restockVehicle } from "../../services/vehicle.service";

function VehicleCard({ vehicle: rawVehicle, onRefresh }) {
  const { isAdmin } = useAuth();
  const vehicle = getEnrichedVehicle(rawVehicle);

  const [purchasing, setPurchasing] = useState(false);
  const [restocking, setRestocking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockQty, setRestockQty] = useState(5);

  const [feedback, setFeedback] = useState(null);

  const status = vehicle.status;
  const isAvailable = status === "Available" && vehicle.quantity > 0;

  const formatPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const handlePurchase = async () => {
    if (vehicle.quantity <= 0) {
      setFeedback({ type: "error", text: "Vehicle is out of stock." });
      return;
    }
    try {
      setPurchasing(true);
      setFeedback(null);
      await purchaseVehicle(vehicle.id);
      setFeedback({ type: "success", text: "Purchase successful! Stock updated." });
      setShowPurchaseConfirm(false);
      setShowDetailsModal(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Failed to process purchase.",
      });
      setShowPurchaseConfirm(false);
    } finally {
      setPurchasing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setFeedback(null);
      await deleteVehicle(vehicle.id);
      setShowDeleteConfirm(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Failed to delete vehicle.",
      });
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleRestock = async () => {
    if (!restockQty || restockQty <= 0) return;
    try {
      setRestocking(true);
      setFeedback(null);
      await restockVehicle(vehicle.id, Number(restockQty));
      setFeedback({ type: "success", text: `Restocked ${restockQty} units successfully!` });
      setShowRestockModal(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Failed to restock vehicle.",
      });
      setShowRestockModal(false);
    } finally {
      setRestocking(false);
    }
  };

  return (
    <>
      <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-800/30 hover:shadow-xl hover:shadow-slate-200/70">
        <div>
          <div className="relative overflow-hidden">
            <VehicleImage
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-44 w-full rounded-none bg-slate-100 object-cover transition-transform duration-500 group-hover:scale-105"
              src={vehicle.imageUrl}
            />
            <span
              className={`absolute top-2.5 right-2.5 rounded-md px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase shadow-2xs backdrop-blur-md border ${
                isAvailable
                  ? "bg-emerald-900/90 text-white border-emerald-700/50"
                  : status === "Sold" || vehicle.quantity === 0
                  ? "bg-slate-900/90 text-white border-slate-700/50"
                  : "bg-amber-700/90 text-white border-amber-600/50"
              }`}
            >
              {isAvailable ? "Available" : vehicle.quantity === 0 ? "Out of Stock" : status}
            </span>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-900 transition-colors tracking-tight">
                  {vehicle.make} {vehicle.model}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                    {vehicle.year || "N/A"}
                  </span>
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs font-medium text-slate-500">{vehicle.category}</span>
                </div>
              </div>
            </div>

            <dl className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 border-y border-slate-100 py-2.5 text-xs">
              <div>
                <dt className="text-slate-400 font-medium text-[11px]">Fuel Type</dt>
                <dd className="mt-0.5 font-bold text-slate-800">{vehicle.fuelType || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium text-[11px]">Transmission</dt>
                <dd className="mt-0.5 font-bold text-slate-800">{vehicle.transmission || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium text-[11px]">Mileage</dt>
                <dd className="mt-0.5 font-bold text-slate-800">
                  {typeof vehicle.mileage === "number" ? `${vehicle.mileage.toLocaleString("en-IN")} km` : vehicle.mileage || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium text-[11px]">Stock</dt>
                <dd className={`mt-0.5 font-bold ${vehicle.quantity > 0 ? "text-slate-800" : "text-red-600"}`}>
                  {vehicle.quantity} {vehicle.quantity === 1 ? "unit" : "units"}
                </dd>
              </div>
            </dl>

            <div className="mt-3.5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Price</p>
                <p className="text-lg font-extrabold text-slate-900 tracking-tight">{formatPrice.format(vehicle.price)}</p>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 transition"
                    onClick={() => setShowRestockModal(true)}
                    title="Restock Inventory"
                    type="button"
                  >
                    Restock
                  </button>
                  <span className="text-slate-200">|</span>
                  <button
                    className="text-xs font-bold text-red-600 hover:text-red-800 transition"
                    onClick={() => setShowDeleteConfirm(true)}
                    title="Delete Vehicle"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {feedback && (
              <div
                className={`mt-2.5 rounded-lg p-2 text-xs font-semibold ${
                  feedback.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200/50" : "bg-red-50 text-red-600 border border-red-200/50"
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`grid gap-2 p-4 pt-0 ${isAdmin ? "grid-cols-3" : "grid-cols-2"}`}>
          <button
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 active:scale-98 shadow-2xs"
            onClick={() => setShowDetailsModal(true)}
            type="button"
          >
            View
          </button>

          {isAdmin && (
            <Link
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 active:scale-98 shadow-2xs"
              to={`/vehicles/${vehicle.id}/edit`}
            >
              Edit
            </Link>
          )}

          <button
            className={`flex items-center justify-center rounded-xl py-2 text-xs font-bold transition active:scale-98 ${
              isAvailable
                ? "bg-emerald-900 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/20"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
            disabled={!isAvailable || purchasing}
            onClick={() => setShowPurchaseConfirm(true)}
            type="button"
          >
            {purchasing ? "Buying..." : "Purchase"}
          </button>
        </div>
      </article>

      {/* 1. View Vehicle Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
            <div className="relative">
              <VehicleImage
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-56 w-full object-cover bg-slate-100"
                src={vehicle.imageUrl}
              />
              <button
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white transition active:scale-95 text-xs font-bold"
                onClick={() => setShowDetailsModal(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{vehicle.category} • {vehicle.year}</p>
                </div>
                <p className="text-xl font-extrabold text-emerald-900">{formatPrice.format(vehicle.price)}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3.5">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Fuel Type</p>
                  <p className="text-xs font-extrabold text-slate-800">{vehicle.fuelType || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Transmission</p>
                  <p className="text-xs font-extrabold text-slate-800">{vehicle.transmission || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Mileage</p>
                  <p className="text-xs font-extrabold text-slate-800">
                    {typeof vehicle.mileage === "number" ? `${vehicle.mileage.toLocaleString("en-IN")} km` : vehicle.mileage || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Available Stock</p>
                  <p className={`text-xs font-extrabold ${vehicle.quantity > 0 ? "text-slate-800" : "text-red-600"}`}>
                    {vehicle.quantity} units
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2.5">
                <button
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  onClick={() => setShowDetailsModal(false)}
                  type="button"
                >
                  Close
                </button>
                {isAvailable && (
                  <button
                    className="rounded-xl bg-emerald-900 px-4.5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-800 transition active:scale-98"
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowPurchaseConfirm(true);
                    }}
                    type="button"
                  >
                    Purchase Vehicle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Purchase Confirmation Modal */}
      {showPurchaseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900">Confirm Purchase</h3>
            <p className="mt-1.5 text-xs text-slate-600">
              Are you sure you want to purchase <span className="font-bold text-slate-900">{vehicle.make} {vehicle.model}</span> for <span className="font-extrabold text-emerald-900">{formatPrice.format(vehicle.price)}</span>?
            </p>
            <div className="mt-3.5 rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs text-slate-500 font-medium">
              Current stock: <span className="font-bold text-slate-800">{vehicle.quantity} units available</span>
            </div>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                onClick={() => setShowPurchaseConfirm(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-emerald-900 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-800 transition active:scale-98 disabled:opacity-50"
                disabled={purchasing}
                onClick={handlePurchase}
                type="button"
              >
                {purchasing ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Delete Confirmation Modal (Admin only) */}
      {showDeleteConfirm && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900">Delete Vehicle</h3>
            <p className="mt-1.5 text-xs text-slate-600">
              Are you sure you want to delete <span className="font-bold text-slate-900">{vehicle.make} {vehicle.model}</span> from inventory? This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                onClick={() => setShowDeleteConfirm(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-red-700 transition active:scale-98 disabled:opacity-50"
                disabled={deleting}
                onClick={handleDelete}
                type="button"
              >
                {deleting ? "Deleting..." : "Delete Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Restock Modal (Admin only) */}
      {showRestockModal && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900">Restock Inventory</h3>
            <p className="mt-1.5 text-xs text-slate-600">
              Enter quantity of <span className="font-bold text-slate-900">{vehicle.make} {vehicle.model}</span> to add to stock ({vehicle.quantity} units).
            </p>
            <div className="mt-3.5">
              <label className="block text-xs font-bold text-slate-700 mb-1">Restock Quantity</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10"
                min={1}
                onChange={(e) => setRestockQty(e.target.value)}
                type="number"
                value={restockQty}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                onClick={() => setShowRestockModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-emerald-900 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-800 transition active:scale-98 disabled:opacity-50"
                disabled={restocking || !restockQty || restockQty <= 0}
                onClick={handleRestock}
                type="button"
              >
                {restocking ? "Restocking..." : "Restock Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VehicleCard;
