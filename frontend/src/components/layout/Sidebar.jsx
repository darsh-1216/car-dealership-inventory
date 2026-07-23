import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Vehicles", to: "/vehicles" },
];

function Sidebar({ isOpen, onClose, onLogout }) {
  const navClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`;

  return (
    <>
      {isOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={onClose} type="button" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between px-2">
          <span className="text-lg font-bold text-slate-900">Car Dealership</span>
          <button className="text-slate-500 lg:hidden" onClick={onClose} type="button">×</button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => <NavLink className={navClass} key={item.to} onClick={onClose} to={item.to}>{item.label}</NavLink>)}
        </nav>
        <button className="mt-auto rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50" onClick={onLogout} type="button">Logout</button>
      </aside>
    </>
  );
}

export default Sidebar;
