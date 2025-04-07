import axios from "axios";
import API_BASE_URL from "./config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Agrega el token automáticamente a cada petición
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Asegúrate de que lo guardas en el login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;