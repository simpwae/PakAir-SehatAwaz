import axios from "axios";

// API base URL - adjust this to match your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// In dev, discourage caching responses to avoid stale UI
if (import.meta.env.DEV) {
  api.defaults.headers.common["Cache-Control"] =
    "no-store, no-cache, must-revalidate";
  api.defaults.headers.common["Pragma"] = "no-cache";
  api.defaults.headers.common["Expires"] = "0";
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("isAuthenticated");
      // Optionally redirect to login
      if (
        window.location.pathname !== "/citizen/login" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/citizen/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Reports API
export const reportsAPI = {
  createReport: async (formData) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_BASE_URL}/reports`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getReports: async (params = {}) => {
    const response = await api.get("/reports", { params });
    return response.data;
  },
  getReport: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },
  verifyReport: async (id, verificationNotes = "") => {
    const response = await api.patch(`/reports/${id}/verify`, {
      verificationNotes,
    });
    return response.data;
  },
  rejectReport: async (id, verificationNotes = "") => {
    const response = await api.patch(`/reports/${id}/reject`, {
      verificationNotes,
    });
    return response.data;
  },
  deleteReport: async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
};

export default api;
