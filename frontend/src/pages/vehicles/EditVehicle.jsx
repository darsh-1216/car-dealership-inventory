import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVehicleById, updateVehicle } from "../../services/vehicle.service";

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: 2023,
    category: "SUV",
    price: "",
    quantity: 1,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Available",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const data = await getVehicleById(id);
        if (data) {
          setFormData({
            make: data.make || "",
            model: data.model || "",
            year: data.year || 2023,
            category: data.category || "SUV",
            price: data.price != null ? data.price : "",
            quantity: data.quantity != null ? data.quantity : 1,
            mileage: data.mileage != null ? data.mileage : 0,
            fuelType: data.fuelType || "Petrol",
            transmission: data.transmission || "Automatic",
            status: data.status || "Available",
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load vehicle details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      await updateVehicle(id, {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        mileage: Number(formData.mileage),
        year: Number(formData.year),
      });
      navigate("/vehicles");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center text-slate-500">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mb-3"></div>
        Loading vehicle details...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Vehicle</h1>
          <p className="text-sm text-slate-500">Update specification details for this inventory item.</p>
        </div>
        <Link
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          to="/vehicles"
        >
          Cancel
        </Link>
      </div>

      <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Make *</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="make"
              onChange={handleChange}
              required
              type="text"
              value={formData.make}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Model *</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="model"
              onChange={handleChange}
              required
              type="text"
              value={formData.model}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Year</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              max={2030}
              min={1990}
              name="year"
              onChange={handleChange}
              type="number"
              value={formData.year}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="category"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Price (₹) *</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              min={0}
              name="price"
              onChange={handleChange}
              required
              type="number"
              value={formData.price}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Quantity (Stock) *</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              min={0}
              name="quantity"
              onChange={handleChange}
              required
              type="number"
              value={formData.quantity}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mileage (km)</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              min={0}
              name="mileage"
              onChange={handleChange}
              type="number"
              value={formData.mileage}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Fuel Type</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="fuelType"
              onChange={handleChange}
              value={formData.fuelType}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Transmission</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="transmission"
              onChange={handleChange}
              value={formData.transmission}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            to="/vehicles"
          >
            Cancel
          </Link>
          <button
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Saving..." : "Update Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVehicle;
