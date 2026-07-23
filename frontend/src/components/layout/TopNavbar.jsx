function TopNavbar({ title, user, onMenuClick, onLogout, isProfileOpen, onProfileToggle }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button aria-label="Open navigation" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={onMenuClick} type="button">☰</button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="relative">
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100" onClick={onProfileToggle} type="button">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">{user?.email?.[0]?.toUpperCase() || "U"}</span>
          <span className="hidden max-w-40 truncate sm:block">{user?.email || "User"}</span>
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            <p className="truncate px-3 py-2 text-xs text-slate-500">{user?.email || "User"}</p>
            <a href="/profile" className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={onProfileToggle}>My Profile</a>
            <button className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50" onClick={onLogout} type="button">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNavbar;
