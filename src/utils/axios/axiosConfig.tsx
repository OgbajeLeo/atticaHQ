import axios from "axios";
import { getToken, removeToken } from "../cookies";

// Create a separate export for network status management
export let setNetworkError: (status: boolean) => void;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

export const configureAxiosNetworkHandling = (
  networkErrorSetter: typeof setNetworkError
) => {
  setNetworkError = networkErrorSetter;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        setNetworkError?.(true);
        throw new Error(
          "Network timeout. Please check your internet connection."
        );
      } else if (error.code === "ERR_NETWORK") {
        setNetworkError?.(true);
        throw new Error(
          "No Internet connection. Please check your internet connection."
        );
      } else {
        setNetworkError?.(true);
        throw new Error(error.code);
      }
    }

    if (error.response.status === 401) {
      if (error.response.data.message === "Invalid email or password") {
        throw new Error(error.response.data.message || "Unauthorized access");
      }
      if (error.response.data.message === "Token expired") {
        removeToken();
        throw new Error(error.response.data.message || "Unauthorized access");
      }
      if (
        error.response.data.message ===
        "Session is not active. Please login again"
      ) {
        removeToken();
        // const loginPageUrl = "/login";
        // window.location.href = loginPageUrl;
        throw new Error(error.response.data.message || "Unauthorized access");
      }
      if (error.response.data.message === "User not found") {
        // removeToken();
        // const loginPageUrl = "/login";
        // window.location.href = loginPageUrl;
        throw new Error(error.response.data.message || "Unauthorized access");
      }

      throw new Error(
        error.response.data.message ||
          "Unauthorized access. Please log in again."
      );
    }

    throw new Error(error.response.data.message || "An error occurred.");
  }
);

export default axiosInstance;
