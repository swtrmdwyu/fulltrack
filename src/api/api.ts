import axios from "axios";
import refreshToken from "../services/refreshToken";
import AuthTokens from "../interfaces/AuthTokens";

function getStorageToken(): string {
    const storage = localStorage.getItem("authTokens");
    if(storage) {
        const authObj: AuthTokens = JSON.parse(storage);

        return authObj.authToken;
    }

    return "";
}

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Authorization": `Bearer ${getStorageToken()}`
    }
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
