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
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">User Profile</h1>
        <p className="mt-0.5 text-xs text-slate-500 font-medium">View and manage your user account information.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-extrabold text-white shadow-2xs">
            {initial}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{name}</h2>
              <span
                className={`mt-1 inline-block rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                  roleRaw === "admin"
                    ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                    : "bg-slate-100 text-slate-700 border border-slate-200/60"
                }`}
              >
                {roleDisplay}
              </span>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4 text-xs">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Email Address</p>
                <p className="font-bold text-slate-800">{email}</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Role Privilege</p>
                <p className="font-bold text-slate-800">{roleDisplay}</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Account Status</p>
                <p className="font-bold text-emerald-600">Active</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                className="w-full sm:w-auto rounded-lg bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-red-700 transition active:scale-98"
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
