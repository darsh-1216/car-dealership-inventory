import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import useAuth from "../hooks/useAuth";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/vehicles": "Vehicles",
  "/vehicles/add": "Add Vehicle",
  "/profile": "Profile",
};

function DashboardLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const title = pageTitles[pathname] || (pathname.startsWith("/vehicles/") ? "Edit Vehicle" : "Dashboard");

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={handleLogout} />
      <div className="lg:pl-64">
        <TopNavbar isProfileOpen={isProfileOpen} onLogout={handleLogout} onMenuClick={() => setIsSidebarOpen(true)} onProfileToggle={() => setIsProfileOpen((open) => !open)} title={title} user={user} />
        <main className="p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  );
}

export default DashboardLayout;
