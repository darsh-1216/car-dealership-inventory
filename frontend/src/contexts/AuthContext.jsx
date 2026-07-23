import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth.service";

const AuthContext = createContext(null);

const parseJwtRole = (token) => {
  if (!token) return "customer";
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = JSON.parse(atob(payloadBase64));
    return decodedJson.role || "customer";
  } catch {
    return "customer";
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

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const role = parsedUser.role || parseJwtRole(storedToken) || "customer";
        setToken(storedToken);
        setUser({ ...parsedUser, role });
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
    const role = parseJwtRole(data.token);
    const authenticatedUser = { email, role };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    setToken(data.token);
    setUser(authenticatedUser);

    return data;
  }, []);

  const register = useCallback(
    (email, password) => registerUser(email, password),
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
