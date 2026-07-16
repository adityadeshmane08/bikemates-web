import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${API}/auth/me`, { credentials: "include" });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
        localStorage.setItem("bikemates_user", JSON.stringify(u));
      } else {
        const saved = localStorage.getItem("bikemates_user");
        if (saved) setUser(JSON.parse(saved));
      }
    } catch (e) {
      const saved = localStorage.getItem("bikemates_user");
      if (saved) setUser(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // CRITICAL: If returning from OAuth callback, skip the /me check.
    // AuthCallback will exchange the session_id and establish the session first.
    if (window.location.hash?.includes("session_id=")) {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [checkAuth]);

  // Email/password demo login (client-side mock)
  const login = (data) => {
    const u = { name: data.name || data.email.split("@")[0], email: data.email };
    localStorage.setItem("bikemates_user", JSON.stringify(u));
    setUser(u);
    return u;
  };

  // Store the verified user returned by the backend after Google OAuth
  const setSessionUser = (u) => {
    setUser(u);
    localStorage.setItem("bikemates_user", JSON.stringify(u));
  };

  const loginWithGoogle = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const logout = async () => {
    try { await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" }); } catch (e) { /* ignore */ }
    localStorage.removeItem("bikemates_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, setSessionUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { API };
