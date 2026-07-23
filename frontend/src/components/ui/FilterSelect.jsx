function FilterSelect({ label, options, value, onChange, disabled = false }) {
  const getPluralLabel = (str) => {
    if (!str) return "All";
    const lower = str.toLowerCase();
    if (lower === "category") return "All Categories";
    if (lower === "status") return "All Statuses";
    return `All ${str}s`;
  };

  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
      {label}
      <select
        className="h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        <option value="">{getPluralLabel(label)}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default FilterSelect;
