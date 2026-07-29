"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await getProfile();
        console.log("Profile on mount:", profile);
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setAuthLoaded(true); // ← always set true when done
      }
    };
    checkAuth();
  }, []);

  const updateUser = (userData) => setUser(userData);

  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, authLoaded, updateUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
