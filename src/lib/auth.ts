// import axios from "axios";
// import Cookies from "js-cookie";

// const api = axios.create({
//   baseURL: process.env.BASE_URL_BACKEND,
// });

// // Add token to every request
// api.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle unauthorized responses
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

// export const login = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await api.post("/api/login", credentials);
//     const { token } = response.data;

//     // Store token in HTTP-only cookie
//     Cookies.set("token", token, {
//       expires: 7, // 7 days
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = () => {
//   Cookies.remove("token");
//   window.location.href = "/login";
// };

// export { api };
