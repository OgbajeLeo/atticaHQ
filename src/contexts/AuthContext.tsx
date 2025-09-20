import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthApi } from "../utils";
import {
  getAdminToken,
  setAdminToken,
  removeAdminToken,
  getAdminUser,
  setAdminUser,
  removeAdminUser,
} from "../utils/cookies";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    const userData = getAdminUser();

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        removeAdminToken();
        removeAdminUser();
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = (await AuthApi.adminLogin(email, password)) as any;

      if (response && response) {
        const { status, token } = response;

        if (status && token) {
          const expiresIn = 24 * 60 * 60;
          setAdminToken(token, expiresIn);

          // Get user details from the API
          const userResponse = (await AuthApi.LoggedUser()) as any;

          if (userResponse) {
            const userData = {
              id: userResponse.data.id.toString(),
              name: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
              email: userResponse.data.email,
              role: "admin",
            };

            setAdminUser(JSON.stringify(userData), expiresIn);
            setUser(userData);
          } else {
            const userData = {
              id: "admin",
              name: "Admin User",
              email: email,
              role: "admin",
            };

            setAdminUser(JSON.stringify(userData), expiresIn);
            setUser(userData);
          }

          return true;
        } else {
          console.log("Login failed: status or token missing");
        }
      } else {
        console.log("No response or response.data");
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    removeAdminToken();
    removeAdminUser();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
