import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request Interceptor (optional)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // centralized error handling
        if (error.response?.status === 401) {
            console.error("Unauthorized");
        }
        return Promise.reject(error);
    }
);

export default api;