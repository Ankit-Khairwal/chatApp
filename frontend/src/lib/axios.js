import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  timeout: 3500,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to handle CORS preflight
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure credentials are included in every request
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // 401 during auth check is expected for logged-out users.
      if (status !== 401) {
        console.error("Response error:", data);
      }
      return Promise.reject(error);
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject(new Error("Request timed out. Please try again."));
      }
      return Promise.reject(new Error("No response from server. Please check your connection."));
    } else {
      return Promise.reject(new Error("Error setting up the request."));
    }
  }
);
