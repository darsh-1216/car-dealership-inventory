function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-48 items-center justify-center gap-3 text-slate-600" role="status">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
