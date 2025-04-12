import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chatapp-xq9i.onrender.com/api"
      : "/api",
  withCredentials: true,
});
