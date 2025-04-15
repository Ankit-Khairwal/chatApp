import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://chatapp-xq9i.onrender.com";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to handle CORS preflight
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure credentials are included in every request
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
      return Promise.reject(new Error('Error setting up the request.'));
    }
  }
);
