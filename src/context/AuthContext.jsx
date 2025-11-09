import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);

  const login = (loginData) => {
    setUser(null);
    fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
      });

    navigate("/dashboard");
  };

  const register = (userData) => {
    console.log(userData);
    fetch(`${api}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .finally(() => {
        navigate("/login");
      });
  };

  const logout = () => {
    fetch(`${api}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok);
      })
      .then(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });

    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    register,
    token,
    isAuthtenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export function getCookie(name) {
//   return document.cookie.split("; ").reduce((acc, c) => {
//     const [k, v] = c.split("=");
//     return l === name ? decodeURIComponent(v) : acc;
//   }, null);
// }

export function useAuth() {
  return useContext(AuthContext);
}
