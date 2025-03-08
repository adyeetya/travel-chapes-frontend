"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth/AuthLogic";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuth(); // Use the useAuth hook

  // Validate token on mount
  useEffect(() => {
    auth.validateToken();
  }, [auth.validateToken]);
  if (auth.loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}