import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createVehicle } from "../../services/vehicle.service";

function AddVehicle() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    category: "SUV",
    price: "",
    quantity: 1,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.category) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await createVehicle({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        mileage: Number(formData.mileage),
        year: Number(formData.year),
      });
      navigate("/vehicles");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Add New Vehicle</h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">Enter vehicle specifications to add it to inventory.</p>
        </div>
        <Link
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-95"
          to="/vehicles"
        >
          Cancel
        </Link>
      </div>

      <form className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Make *</label>
            <input
              className={inputClass}
              name="make"
              onChange={handleChange}
              placeholder="e.g. Toyota"
              required
              type="text"
              value={formData.make}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Model *</label>
            <input
              className={inputClass}
              name="model"
              onChange={handleChange}
              placeholder="e.g. Fortuner"
              required
              type="text"
              value={formData.model}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Year</label>
            <input
              className={inputClass}
              max={2030}
              min={1990}
              name="year"
              onChange={handleChange}
              type="number"
              value={formData.year}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Category *</label>
            <select className={inputClass} name="category" onChange={handleChange} value={formData.category}>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Price (₹) *</label>
            <input
              className={inputClass}
              min={0}
              name="price"
              onChange={handleChange}
              placeholder="e.g. 1500000"
              required
              type="number"
              value={formData.price}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Quantity (Stock) *</label>
            <input
              className={inputClass}
              min={0}
              name="quantity"
              onChange={handleChange}
              required
              type="number"
              value={formData.quantity}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Mileage (km)</label>
            <input
              className={inputClass}
              min={0}
              name="mileage"
              onChange={handleChange}
              type="number"
              value={formData.mileage}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Fuel Type</label>
            <select className={inputClass} name="fuelType" onChange={handleChange} value={formData.fuelType}>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Transmission</label>
            <select className={inputClass} name="transmission" onChange={handleChange} value={formData.transmission}>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Status</label>
            <select className={inputClass} name="status" onChange={handleChange} value={formData.status}>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
          <Link
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95"
            to="/vehicles"
          >
            Cancel
          </Link>
          <button
            className="rounded-xl bg-emerald-900 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-800 transition active:scale-95 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Saving..." : "Add Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVehicle;
