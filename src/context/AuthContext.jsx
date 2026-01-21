"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("parakram_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    const mockUser = {
      id: "user_" + Math.random().toString(36).substring(7),
      name: "Athlete Name",
      email: "athlete@college.edu",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      jerseyVerified: false,
      registeredSports: [],
    };
    setUser(mockUser);
    localStorage.setItem("parakram_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("parakram_user");
  };

  const verifyJersey = async (jerseyNumber, collegeName) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (user && jerseyNumber && collegeName) {
      const updatedUser = { ...user, jerseyVerified: true };
      setUser(updatedUser);
      localStorage.setItem("parakram_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const registerForSport = async (sportName) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (user && !user.registeredSports.includes(sportName)) {
      const updatedUser = {
        ...user,
        registeredSports: [...user.registeredSports, sportName],
      };
      setUser(updatedUser);
      localStorage.setItem("parakram_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, verifyJersey, registerForSport }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}