import { useMemo, useState } from "react";
import { AuthContext } from "./auth";
import { AuthAPI } from "../services/api";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!token;

  const login = async (email, password, { remember } = { remember: true }) => {
    setLoading(true);
    try {
      const { data } = await AuthAPI.login({ email, password });
      const store = remember ? localStorage : sessionStorage;
      store.setItem("token", data.token);
      setToken(data.token);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.error || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await AuthAPI.register({ email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        message: e.response?.data?.error || "Register failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, isAuthenticated, loading, login, register, logout }),
    [token, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
