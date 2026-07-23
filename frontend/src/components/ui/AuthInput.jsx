function AuthInput({ label, error, ...inputProps }) {
  return (
    <label className="block text-xs font-bold text-slate-700">
      {label}
      <input
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400"
        {...inputProps}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

export default AuthInput;
