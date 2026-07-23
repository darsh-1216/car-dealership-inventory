import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();

  const email = user?.email || "user@example.com";
  const name = user?.name || email.split("@")[0] || "User";
  const roleRaw = user?.role || "customer";
  const roleDisplay = roleRaw === "admin" ? "Admin" : "Customer";
  const initial = (name[0] || email[0] || "U").toUpperCase();

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">User Profile</h1>
        <p className="text-sm text-slate-500">View and manage your user account information.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-extrabold text-white shadow-md shadow-blue-200">
            {initial}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                roleRaw === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-50 text-blue-700"
              }`}>
                {roleDisplay}
              </span>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div>
                <p className="text-xs text-slate-400 font-medium">Email Address</p>
                <p className="font-semibold text-slate-800">{email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Role Privilege</p>
                <p className="font-semibold text-slate-800">{roleDisplay}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Account Status</p>
                <p className="font-semibold text-emerald-600">Active</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                className="w-full sm:w-auto rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-200 hover:bg-red-700 transition"
                onClick={logout}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
