function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/90 px-6 py-16 text-center shadow-xs">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
        <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 16v-4l2-5h10l2 5v4M4 16h16v3H4zM7 19h.01M17 19h.01M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-4 text-base font-extrabold text-slate-900 tracking-tight">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-xs font-medium text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;
