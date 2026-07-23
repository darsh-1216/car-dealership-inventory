import FilterSelect from "../ui/FilterSelect";

function VehicleFilters({ categories, search, status, onSearchChange, onStatusChange, onCategoryChange, category }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px] md:items-end">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
          Search inventory
          <input
            className="h-9.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            onChange={onSearchChange}
            placeholder="Make, model, or category..."
            type="search"
            value={search}
          />
        </label>
        <FilterSelect label="Status" onChange={onStatusChange} options={["Available", "Sold"]} value={status} />
        <FilterSelect label="Category" onChange={onCategoryChange} options={categories} value={category} />
      </div>
    </div>
  );
}

export default VehicleFilters;
