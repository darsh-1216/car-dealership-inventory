function FilterSelect({ label, options, value, onChange, disabled = false }) {
  const getPluralLabel = (str) => {
    if (!str) return "All";
    const lower = str.toLowerCase();
    if (lower === "category") return "All Categories";
    if (lower === "status") return "All Statuses";
    return `All ${str}s`;
  };

  return (
    <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
      {label}
      <select
        className="h-9.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100"
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
