import { Link } from "react-router-dom";

function TopNavbar({ title, user, onMenuClick, onLogout, isProfileOpen, onProfileToggle }) {
  const avatarLetter = (user?.email?.[0] || "U").toUpperCase();
  const roleDisplay = user?.role === "admin" ? "Admin" : "Customer";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open navigation"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">{title}</h1>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-98"
          onClick={onProfileToggle}
          type="button"
        >
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-emerald-950 font-extrabold text-emerald-300 text-[11px]">
            {avatarLetter}
          </span>
          <div className="hidden text-left sm:block">
            <span className="block max-w-36 truncate text-xs font-bold text-slate-900">{user?.email || "User"}</span>
          </div>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-1.5 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="truncate text-xs font-bold text-slate-900">{user?.email || "User"}</p>
              <span className="mt-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-900 border border-emerald-200/60 capitalize">
                {roleDisplay}
              </span>
            </div>

            <Link
              className="mt-1 flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              onClick={onProfileToggle}
              to="/profile"
            >
              <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              My Profile
            </Link>

            <button
              className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition"
              onClick={onLogout}
              type="button"
            >
              <svg className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNavbar;
