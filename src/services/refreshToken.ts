import tokenAPI from "../api/token";
import AuthTokens from "../interfaces/AuthTokens";

export default async function refreshToken(): Promise<AuthTokens | undefined> {
    try {
        const storageTokens = localStorage.getItem("authTokens");

        if(storageTokens) {
            const oldAuthTokens: AuthTokens = JSON.parse(storageTokens);

            const form = new FormData();
            form.append("grant_type", import.meta.env.VITE_API_REFRESH_GRANT_TYPE);
            form.append("refresh_token", oldAuthTokens.refreshToken);      

            const response = await tokenAPI.post("token/refresh", form);

            const authTokens: AuthTokens = {
                authToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            }

            return authTokens;
        }

        return undefined;
    } catch(err) {
        console.log(err)
        return undefined;
    }
}