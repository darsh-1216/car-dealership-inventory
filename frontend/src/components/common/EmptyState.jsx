function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24"><path d="M5 16v-4l2-5h10l2 5v4M4 16h16v3H4zM7 19h.01M17 19h.01M6 12h12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default EmptyState;
