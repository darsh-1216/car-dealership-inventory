import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth.service";

const AuthContext = createContext(null);

const parseJwt = (token) => {
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      try {
        const payload = parseJwt(storedToken);
        let userObj = null;
        if (storedUser) {
          userObj = JSON.parse(storedUser);
        }
        const email = userObj?.email || payload?.email || "user@example.com";
        const role = userObj?.role || payload?.role || "customer";

        const restoredUser = { email, role };
        setToken(storedToken);
        setUser(restoredUser);
        localStorage.setItem("user", JSON.stringify(restoredUser));
      } catch {
        clearSession();
      }
    }

    setLoading(false);
  }, [clearSession]);

  const logout = useCallback(() => {
    clearSession();
    navigate("/login", { replace: true });
  }, [clearSession, navigate]);

  useEffect(() => {
    const handleUnauthorized = () => logout();

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [logout]);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    const payload = parseJwt(data.token);
    const role = payload?.role || "customer";
    const authenticatedUser = { email, role };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    setToken(data.token);
    setUser(authenticatedUser);

    return data;
  }, []);

  const register = useCallback(
    (email, password, role = "customer") => registerUser(email, password, role),
    []
  );

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
