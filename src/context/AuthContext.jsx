import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const login = (userData) => {
    setUser(userData);
    // api
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const register = (userData) => {
    console.log(userData);
    // api
    navigate("/login");
  };

  const logout = () => {
    // api
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = { user, login, logout, register, isAuthtenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
