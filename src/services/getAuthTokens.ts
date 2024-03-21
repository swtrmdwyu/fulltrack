import tokenAPI from "../api/token";
import AuthTokens from "../interfaces/AuthTokens";

export default async function getAuthTokens(): Promise<AuthTokens> {

    const form = new FormData();

    form.append("grant_type", import.meta.env.VITE_API_GRANT_TYPE);
    form.append("client_id", import.meta.env.VITE_API_CLIENT_ID);
    form.append("client_secret", import.meta.env.VITE_API_CLIENT_SECRET);
    form.append("user_id", import.meta.env.VITE_API_USER_ID);

    const authTokens: AuthTokens = {} as AuthTokens;

    await tokenAPI
    .post("token", form)
    .then((res) => {
        authTokens.authToken = res.data.access_token;
        authTokens.refreshToken = res.data.refresh_token;
    })
    .catch((error) => console.log(error));

    return authTokens;
}