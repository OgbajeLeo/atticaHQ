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

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
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
              photo:
                userResponse.data.photo !== "user_image"
                  ? userResponse.data.photo
                  : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23374151'/%3E%3Ccircle cx='64' cy='45' r='20' fill='%236B7280'/%3E%3Cpath d='M32 100c0-17.7 14.3-32 32-32s32 14.3 32 32' fill='%236B7280'/%3E%3C/svg%3E",
            };

            setAdminUser(JSON.stringify(userData), expiresIn);
            setUser(userData);
          } else {
            const userData = {
              id: "admin",
              name: "Admin User",
              email: email,
              role: "admin",
              photo:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23374151'/%3E%3Ccircle cx='64' cy='45' r='20' fill='%236B7280'/%3E%3Cpath d='M32 100c0-17.7 14.3-32 32-32s32 14.3 32 32' fill='%236B7280'/%3E%3C/svg%3E",
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

  const refreshUser = async () => {
    try {
      const userResponse = (await AuthApi.LoggedUser()) as any;
      if (userResponse) {
        const userData = {
          id: userResponse.data.id.toString(),
          name: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
          email: userResponse.data.email,
          role: "admin",
          photo:
            userResponse.data.photo !== "user_image"
              ? userResponse.data.photo
              : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23374151'/%3E%3Ccircle cx='64' cy='45' r='20' fill='%236B7280'/%3E%3Cpath d='M32 100c0-17.7 14.3-32 32-32s32 14.3 32 32' fill='%236B7280'/%3E%3C/svg%3E",
        };

        const expiresIn = 24 * 60 * 60;
        setAdminUser(JSON.stringify(userData), expiresIn);
        setUser(userData);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const value: AdminAuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    refreshUser,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
