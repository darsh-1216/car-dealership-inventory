function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
        <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M10 3.9 2.7 16.5A2 2 0 0 0 4.4 19.5h15.2a2 2 0 0 0 1.7-3L14 3.9a2 2 0 0 0-4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
      </div>
      <h2 className="mt-4 font-semibold text-slate-900">Unable to load vehicles</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{message}</p>
      <button className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={onRetry} type="button">
        Try again
      </button>
    </div>
  );
}

export default ErrorState;
