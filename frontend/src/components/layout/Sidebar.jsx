import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Vehicles",
    to: "/vehicles",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 12h16.5m-15 0L6.75 6.75h10.5l1.5 5.25m-15 0v5.25c0 .414.336.75.75.75h.75m11.25-6v5.25c0 .414.336.75.75.75h.75" />
      </svg>
    ),
  },
  {
    label: "Profile",
    to: "/profile",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

function Sidebar({ isOpen, onClose, onLogout }) {
  const { user } = useAuth();
  const roleDisplay = user?.role === "admin" ? "Admin" : "Customer";

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
      isActive
        ? "bg-emerald-900 text-white font-bold shadow-md shadow-emerald-900/20"
        : "text-slate-600 hover:bg-emerald-50/70 hover:text-emerald-950"
    }`;

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-2xs lg:hidden"
          onClick={onClose}
          type="button"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200/80 bg-white p-4 shadow-xs transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 shadow-md shadow-emerald-950/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 12h16.5" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900">CarDealership</span>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-emerald-800">Luxury Automotive</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 lg:hidden" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <NavLink className={navClass} key={item.to} onClick={onClose} to={item.to}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="mb-2.5 flex items-center justify-between rounded-xl bg-slate-50/80 border border-slate-100 p-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900">{user?.email || "User"}</p>
              <p className="text-[10px] font-medium text-slate-400">Signed in</p>
            </div>
            <span
              className={`ml-2 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                user?.role === "admin"
                  ? "bg-purple-100 text-purple-800 border border-purple-200/60"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-200/60"
              }`}
            >
              {roleDisplay}
            </span>
          </div>

          <button
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50 active:scale-98"
            onClick={onLogout}
            type="button"
          >
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
