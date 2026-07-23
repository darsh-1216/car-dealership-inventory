import FilterSelect from "../ui/FilterSelect";

function VehicleFilters({ categories, search, status, onSearchChange, onStatusChange, onCategoryChange, category }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px] md:items-end">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
          Search inventory
          <input className="h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" onChange={onSearchChange} placeholder="Make, model, or category" type="search" value={search} />
        </label>
        <FilterSelect label="Status" onChange={onStatusChange} options={["Available", "Sold"]} value={status} />
        <FilterSelect label="Category" onChange={onCategoryChange} options={categories} value={category} />
      </div>
    </div>
  );
}

export default VehicleFilters;
