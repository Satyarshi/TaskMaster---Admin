import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to add token to all requests
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/signin", { email, password });
      if (response.data.token) {
        // Set cookie with token
        Cookies.set("token", response.data.token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData: any) => {
    try {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    Cookies.remove("token", { path: "/" });
  },
};

export default api;
