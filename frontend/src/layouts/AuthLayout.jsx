function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 shadow-md shadow-emerald-950/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 12h16.5" />
            </svg>
          </div>
          <span className="ml-3 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
            Luxury Automotive OS
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          <p className="mt-1.5 text-xs font-medium text-slate-500">{subtitle}</p>
        </div>
        {children}
        {footer && <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs font-medium text-slate-600">{footer}</div>}
      </section>
    </main>
  );
}

export default AuthLayout;
