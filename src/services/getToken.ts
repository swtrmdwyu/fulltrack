import tokenAPI from "../config/api/token";
import IAuthRespose from "../interfaces/IAuthResponse";

export default async function getToken(): Promise<IAuthRespose | null> {
    const form = new FormData();

    form.append("grant_type", import.meta.env.VITE_API_GRANT_TYPE);
    form.append("client_id", import.meta.env.VITE_API_CLIENT_ID);
    form.append("client_secret", import.meta.env.VITE_API_CLIENT_SECRET);
    form.append("user_id", import.meta.env.VITE_API_USER_ID);

    let response: IAuthRespose | null = null;
    
    await tokenAPI
    .post("", form)
    .then((res) => {
        response = {
            token: res.data.access_token,
            refresh: res.data.refresh_token,
          }
    })
    .catch(error => console.log(error));

    return response;
}
