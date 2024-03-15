import tokenAPI from "../config/api/token";

export default async function getToken() {
    const form = new FormData();

    form.append("grant_type", import.meta.env.VITE_API_GRANT_TYPE);
    form.append("client_id", import.meta.env.VITE_API_CLIENT_ID);
    form.append("client_secret", import.meta.env.VITE_API_CLIENT_SECRET);
    form.append("user_id", import.meta.env.VITE_API_USER_ID);

    let response = undefined;
    
    await tokenAPI
    .post("", form)
    .then((res) => response = res.data)
    .catch(error => console.log(error));

    return response;
}
