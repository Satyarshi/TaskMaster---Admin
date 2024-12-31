// // utils/api.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// api.interceptors.request.use((config) => {
//   // Get token from cookies
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token="))
//     ?.split("=")[1];

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear token and redirect to login
//       document.cookie =
//         "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;
