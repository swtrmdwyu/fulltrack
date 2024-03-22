import axios from "axios";
import tokenAPI from "./token";
import AuthTokens from "../interfaces/AuthTokens";
import refreshToken from "../services/refreshToken";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

api.interceptors.response.use();

export default api;

api.interceptors.response.use(
    (response) => response,
        async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAuthTokens = await refreshToken();

                if(newAuthTokens) {
                    localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
                    originalRequest.headers.Authorization = `Bearer ${newAuthTokens.authToken}`;

                    return api(originalRequest);
                } else {
                    throw new Error("Failed to obtain new authentication tokens.");
                }
            } catch (tokenError) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
