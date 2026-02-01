import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true // Still needed? Maybe not strictly for custom auth, but good for other cookies if any
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = secureLocalStorage.getItem("refreshToken");
        if (!refreshToken) {
          // No refresh token, logout user
          secureLocalStorage.removeItem("accessToken");
          secureLocalStorage.removeItem("refreshToken");
          // window.location.href = "/login"; // Optional: Redirect to login
          return Promise.reject(error);
        }

        const res = await axios.post("http://localhost:3000/api/auth/refresh", {
          refreshToken,
        });

        const { accessToken } = res.data;
        secureLocalStorage.setItem("accessToken", accessToken);
        // If rotating refresh token: secureLocalStorage.setItem("refreshToken", res.data.refreshToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        secureLocalStorage.removeItem("accessToken");
        secureLocalStorage.removeItem("refreshToken");
        // window.location.href = "/login"; // Optional: Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
