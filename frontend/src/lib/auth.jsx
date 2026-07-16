import React, { createContext, useContext, useState, useEffect } from "react";

// Standalone static auth — client-side only (localStorage). No backend required.
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("bikemates_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (data) => {
    const u = { name: data.name || data.email.split("@")[0], email: data.email };
    localStorage.setItem("bikemates_user", JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("bikemates_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
