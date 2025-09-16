// import type { AuthResponse } from "../../hooks/useAuth";


export const LoginApi = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Login failed");
    }

    const data = await response.json();
    return data as any;
  },
};

