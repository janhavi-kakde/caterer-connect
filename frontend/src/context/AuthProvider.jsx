import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cater-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    // ─── DEFENSIVE: data could be the full axios response or just the body ───
    // If someone accidentally passed res instead of res.data, handle it
    const payload = data?.data ?? data;

    const token = payload?.token;
    const userObj = {
      _id: payload?._id,
      name: payload?.name,
      email: payload?.email,
      role: payload?.role,
    };

    // Guard: never save an undefined/null token
    if (!token) {
      console.error("❌ login() called but no token found in payload:", payload);
      return;
    }

    console.log("✅ Saving token:", token);
    console.log("✅ Saving user:", userObj);

    localStorage.setItem("token", token);
    localStorage.setItem("cater-user", JSON.stringify({
  _id: data._id,
  name: data.name,
  email: data.email,
  role: data.role,
  catererId: data.catererId   // 🔥 ADD THIS
}));
    setUser(userObj);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cater-user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}